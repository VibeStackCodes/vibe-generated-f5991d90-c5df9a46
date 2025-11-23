import React from 'react';
import { TaskFilter } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { PRIORITY_LEVELS, TASK_STATUS } from '@/lib/constants';
import { Filter, X } from 'lucide-react';

export interface TaskFilterProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onReset?: () => void;
}

export const TaskFilterComponent = React.memo<TaskFilterProps>((
  { filter, onFilterChange, onReset }
) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleStatusChange = (status: TaskFilter['status']) => {
    onFilterChange({ ...filter, status });
  };

  const handlePriorityChange = (priority: TaskFilter['priority']) => {
    onFilterChange({ ...filter, priority });
  };

  const handleReset = () => {
    onReset?.();
    setIsOpen(false);
  };

  const hasActiveFilters = Object.values(filter).some((v) => v !== undefined && v !== null);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className={hasActiveFilters ? 'ring-2 ring-accent-600' : ''}
      >
        <Filter size={18} />
        Filters
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 w-80 z-10">
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filter.status || ''}
                onChange={(e) => handleStatusChange(e.target.value as TaskFilter['status'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Statuses</option>
                {Object.entries(TASK_STATUS).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={filter.priority || ''}
                onChange={(e) => handlePriorityChange(e.target.value as TaskFilter['priority'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Priorities</option>
                {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button variant="secondary" onClick={handleReset} className="flex-1">
                  <X size={16} />
                  Reset
                </Button>
              )}
              <Button variant="primary" onClick={() => setIsOpen(false)} className="flex-1">
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

TaskFilterComponent.displayName = 'TaskFilterComponent';
