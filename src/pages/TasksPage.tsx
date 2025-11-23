import React, { useState, useCallback } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { useNotification } from '@/contexts/NotificationContext';
import { Layout } from '@/components/layout/Layout';
import { TaskList } from '@/components/features/TaskList';
import { TaskForm } from '@/components/features/TaskForm';
import { TaskFilterComponent } from '@/components/features/TaskFilter';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Task, TaskFilter } from '@/types';
import { Plus } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const { tasks, filter, addTask, updateTask, deleteTask, setFilter, getFilteredTasks } = useTask();
  const { addNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = useCallback(() => {
    setSelectedTask(undefined);
    setIsModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  }, []);

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (window.confirm('Are you sure you want to delete this task?')) {
        deleteTask(taskId);
        addNotification({
          type: 'success',
          message: 'Task deleted successfully',
          duration: 3000,
        });
      }
    },
    [deleteTask, addNotification]
  );

  const handleToggleComplete = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
        updateTask(taskId, { status: newStatus });
        addNotification({
          type: 'success',
          message: newStatus === 'completed' ? 'Task completed!' : 'Task reopened',
          duration: 2000,
        });
      }
    },
    [tasks, updateTask, addNotification]
  );

  const handleSubmitTask = useCallback(
    async (data: Partial<Task>) => {
      setIsLoading(true);
      try {
        if (selectedTask) {
          updateTask(selectedTask.id, data);
          addNotification({
            type: 'success',
            message: 'Task updated successfully',
            duration: 3000,
          });
        } else {
          addTask({
            ...data,
            title: data.title || '',
            priority: data.priority || 'medium',
            status: data.status || 'todo',
            createdBy: 'current_user',
            subtasks: [],
          } as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
          addNotification({
            type: 'success',
            message: 'Task created successfully',
            duration: 3000,
          });
        }
        setIsModalOpen(false);
      } catch (error) {
        addNotification({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to save task',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedTask, addTask, updateTask, addNotification]
  );

  const handleResetFilter = useCallback(() => {
    setFilter({});
  }, [setFilter]);

  const filteredTasks = getFilteredTasks();

  return (
    <Layout title="Tasks">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <TaskFilterComponent
              filter={filter}
              onFilterChange={setFilter}
              onReset={handleResetFilter}
            />
          </div>
          <Button variant="primary" onClick={handleAddTask}>
            <Plus size={18} />
            New Task
          </Button>
        </div>

        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          emptyMessage="No tasks found. Create one to get started!"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTask ? 'Edit Task' : 'Create New Task'}
        size="lg"
      >
        <TaskForm
          task={selectedTask}
          onSubmit={handleSubmitTask}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>
    </Layout>
  );
};
