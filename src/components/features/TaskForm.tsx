import React, { useState } from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { useForm } from '@/hooks/useForm';
import { PRIORITY_LEVELS, TASK_STATUS } from '@/lib/constants';

export interface TaskFormProps {
  task?: Task;
  onSubmit: (data: Partial<Task>) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const TaskForm = React.memo<TaskFormProps>((
  { task, onSubmit, onCancel, isLoading = false }
) => {
  const initialValues = {
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'todo',
    dueDate: task?.dueDate || '',
    progress: task?.progress || 0,
  };

  const form = useForm(initialValues, async (values) => {
    await onSubmit(values);
  });

  return (
    <Card>
      <form onSubmit={form.handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            label="Task Title"
            name="title"
            placeholder="Enter task title"
            value={form.values.title}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.title ? form.errors.title : undefined}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter task description"
              value={form.values.description}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={form.values.priority}
                onChange={form.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent transition-all duration-200"
              >
                {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={form.values.status}
                onChange={form.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent transition-all duration-200"
              >
                {Object.entries(TASK_STATUS).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={form.values.dueDate}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progress: {form.values.progress}%
            </label>
            <input
              type="range"
              name="progress"
              min="0"
              max="100"
              value={form.values.progress}
              onChange={form.handleChange}
              className="w-full"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading || form.isSubmitting}
            disabled={isLoading || form.isSubmitting}
          >
            {task ? 'Update Task' : 'Create Task'}
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
});

TaskForm.displayName = 'TaskForm';
