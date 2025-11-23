export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
} as const;

export const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
} as const;

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;

export const TASK_STATUS_LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  completed: 'Completed',
  archived: 'Archived',
} as const;

export const VIEW_TYPES = {
  LIST: 'list',
  KANBAN: 'kanban',
  CALENDAR: 'calendar',
} as const;

export const FILTER_OPTIONS = {
  ALL: 'all',
  MY_TASKS: 'my_tasks',
  ASSIGNED_TO_ME: 'assigned_to_me',
  DELEGATED: 'delegated',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
} as const;

export const SYNC_STATUS = {
  SYNCED: 'synced',
  PENDING: 'pending',
  ERROR: 'error',
  OFFLINE: 'offline',
} as const;

export const API_BASE_URL = process.env.VITE_API_URL || 'https://api.taskrabbit-todo.local';

export const STORAGE_KEYS = {
  TASKS: 'taskrabbit_tasks',
  USERS: 'taskrabbit_users',
  AUTH_TOKEN: 'taskrabbit_auth_token',
  USER_PREFERENCES: 'taskrabbit_user_preferences',
  SYNC_QUEUE: 'taskrabbit_sync_queue',
  LAST_SYNC: 'taskrabbit_last_sync',
} as const;

export const DEBOUNCE_DELAY = 300;
export const THROTTLE_DELAY = 500;
export const SYNC_INTERVAL = 30000; // 30 seconds
export const CACHE_DURATION = 3600000; // 1 hour

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_TASK_TITLE_LENGTH: 255,
  MAX_TASK_DESCRIPTION_LENGTH: 5000,
  MAX_SUBTASKS: 50,
} as const;
