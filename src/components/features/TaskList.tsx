import React, { useMemo } from 'react';
import { Task, TaskFilter } from '@/types';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Plus } from 'lucide-react';

export interface TaskListProps {
  tasks: Task[];
  filter?: TaskFilter;
  isLoading?: boolean;
  onAddTask?: () => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onToggleComplete?: (taskId: string) => void;
  onTaskClick?: (task: Task) => void;
  emptyMessage?: string;
}

export const TaskList = React.memo<TaskListProps>((
  {
    tasks,
    filter,
    isLoading = false,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onToggleComplete,
    onTaskClick,
    emptyMessage = 'No tasks found',
  }
) => {
  const filteredTasks = useMemo(() => {
    if (!filter) return tasks;

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">{emptyMessage}</p>
        {onAddTask && (
          <Button variant="primary" onClick={onAddTask}>
            <Plus size={18} />
            Add Task
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
          onClick={onTaskClick}
        />
      ))}
    </div>
  );
});

TaskList.displayName = 'TaskList';
