import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, TaskFilter } from '@/types';
import { LocalStorage } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface TaskContextType {
  tasks: Task[];
  filter: TaskFilter;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  getFilteredTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = LocalStorage.get<Task[]>(STORAGE_KEYS.TASKS);
    return stored || [];
  });

  const [filter, setFilter] = useState<TaskFilter>({});

  const addTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      LocalStorage.set(STORAGE_KEYS.TASKS, updatedTasks);
    },
    [tasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : task
      );
      setTasks(updatedTasks);
      LocalStorage.set(STORAGE_KEYS.TASKS, updatedTasks);
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      LocalStorage.set(STORAGE_KEYS.TASKS, updatedTasks);
    },
    [tasks]
  );

  const getFilteredTasks = useCallback((): Task[] => {
    return tasks.filter((task) => {
      if (filter.status && task.status !== filter.status) return false;
      if (filter.priority && task.priority !== filter.priority) return false;
      if (filter.assignedTo && task.assignedTo !== filter.assignedTo) return false;
      if (filter.tags && filter.tags.length > 0) {
        const hasAllTags = filter.tags.every((tag) => task.tags?.includes(tag));
        if (!hasAllTags) return false;
      }
      return true;
    });
  }, [tasks, filter]);

  const getTaskById = useCallback(
    (id: string): Task | undefined => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const value: TaskContextType = {
    tasks,
    filter,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    getFilteredTasks,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export function useTask(): TaskContextType {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
