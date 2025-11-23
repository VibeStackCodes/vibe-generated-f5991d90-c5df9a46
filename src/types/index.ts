export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'archived';
  dueDate?: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  subtasks: Subtask[];
  tags?: string[];
  attachments?: string[];
  progress?: number;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: 'admin' | 'manager' | 'member';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TaskFilter {
  status?: Task['status'];
  priority?: Task['priority'];
  assignedTo?: string;
  dueDate?: string;
  tags?: string[];
}

export interface TaskListState {
  tasks: Task[];
  filter: TaskFilter;
  sortBy: 'dueDate' | 'priority' | 'createdAt';
  viewType: 'list' | 'kanban' | 'calendar';
  isLoading: boolean;
  error: string | null;
}

export interface SyncState {
  status: 'synced' | 'pending' | 'error' | 'offline';
  lastSyncTime?: number;
  pendingChanges: number;
  error?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  defaultView: 'list' | 'kanban' | 'calendar';
  itemsPerPage: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface AsyncState<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}
