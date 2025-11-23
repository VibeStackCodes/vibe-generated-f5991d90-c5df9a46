import React from 'react';
import { Task } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PRIORITY_COLORS, PRIORITY_LABELS, TASK_STATUS_LABELS } from '@/lib/constants';
import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';

export interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onToggleComplete?: (taskId: string) => void;
  onClick?: (task: Task) => void;
}

export const TaskCard = React.memo<TaskCardProps>((
  { task, onEdit, onDelete, onToggleComplete, onClick }
) => {
  const isCompleted = task.status === 'completed';
  const priorityColor = PRIORITY_COLORS[task.priority];
  const statusLabel = TASK_STATUS_LABELS[task.status];

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(task)}
    >
      <CardContent>
        <div className="flex items-start gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete?.(task.id);
            }}
            className="mt-1 text-gray-400 hover:text-primary-800 transition-colors"
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted ? (
              <CheckCircle2 size={20} className="text-green-600" />
            ) : (
              <Circle size={20} />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'font-semibold text-base mb-2',
                isCompleted && 'line-through text-gray-500'
              )}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="primary" size="sm">
                {statusLabel}
              </Badge>
              <Badge variant={task.priority === 'urgent' ? 'danger' : 'secondary'} size="sm">
                {PRIORITY_LABELS[task.priority]}
              </Badge>
              {task.progress !== undefined && (
                <Badge variant="accent" size="sm">
                  {task.progress}%
                </Badge>
              )}
            </div>

            {task.dueDate && (
              <p className="text-xs text-gray-500 mb-3">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <div className="text-xs text-gray-600 mb-3">
                Subtasks: {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length}
              </div>
            )}
          </div>

          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                aria-label="Edit task"
              >
                <Edit2 size={16} />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                aria-label="Delete task"
              >
                <Trash2 size={16} className="text-red-600" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

TaskCard.displayName = 'TaskCard';
