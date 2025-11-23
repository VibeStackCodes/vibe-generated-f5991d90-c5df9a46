import React, { useMemo } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TASK_STATUS_LABELS, PRIORITY_LABELS } from '@/lib/constants';

export const AnalyticsPage: React.FC = () => {
  const { tasks } = useTask();

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    const overdue = tasks.filter((t) => {
      if (!t.dueDate || t.status === 'completed') return false;
      return new Date(t.dueDate) < new Date();
    }).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const priorityBreakdown = {
      low: tasks.filter((t) => t.priority === 'low').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      high: tasks.filter((t) => t.priority === 'high').length,
      urgent: tasks.filter((t) => t.priority === 'urgent').length,
    };

    return {
      total,
      completed,
      inProgress,
      todo,
      overdue,
      completionRate,
      priorityBreakdown,
    };
  }, [tasks]);

  return (
    <Layout title="Analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Total Tasks</p>
              <p className="text-4xl font-bold text-primary-800">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Completed</p>
              <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-gray-500 mt-2">{stats.completionRate}% complete</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">In Progress</p>
              <p className="text-4xl font-bold text-accent-600">{stats.inProgress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">To Do</p>
              <p className="text-4xl font-bold text-blue-600">{stats.todo}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Overdue</p>
              <p className="text-4xl font-bold text-red-600">{stats.overdue}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Completion Rate</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all duration-300"
                    style={{ width: `${stats.completionRate}%` }}
                  />
                </div>
                <p className="text-2xl font-bold text-green-600">{stats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Priority Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.priorityBreakdown).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={priority === 'urgent' ? 'danger' : 'secondary'}>
                    {PRIORITY_LABELS[priority as keyof typeof PRIORITY_LABELS]}
                  </Badge>
                  <span className="text-gray-600">{count} tasks</span>
                </div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-800 transition-all duration-300"
                    style={{ width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};
