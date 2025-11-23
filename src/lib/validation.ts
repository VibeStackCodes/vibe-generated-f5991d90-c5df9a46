import { z } from 'zod';
import { PRIORITY_LEVELS, TASK_STATUS, VALIDATION } from './constants';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(VALIDATION.MIN_PASSWORD_LENGTH, `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`);

export const taskTitleSchema = z
  .string()
  .min(1, 'Task title is required')
  .max(VALIDATION.MAX_TASK_TITLE_LENGTH, `Title must be less than ${VALIDATION.MAX_TASK_TITLE_LENGTH} characters`);

export const taskDescriptionSchema = z
  .string()
  .max(VALIDATION.MAX_TASK_DESCRIPTION_LENGTH, `Description must be less than ${VALIDATION.MAX_TASK_DESCRIPTION_LENGTH} characters`)
  .optional();

export const prioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

export const taskStatusSchema = z.enum(['todo', 'in_progress', 'review', 'completed', 'archived']);

export const subtaskSchema = z.object({
  id: z.string(),
  title: taskTitleSchema,
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskSchema = z.object({
  id: z.string(),
  title: taskTitleSchema,
  description: taskDescriptionSchema,
  priority: prioritySchema,
  status: taskStatusSchema,
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subtasks: z.array(subtaskSchema).max(VALIDATION.MAX_SUBTASKS),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
  progress: z.number().min(0).max(100).optional(),
});

export const userSchema = z.object({
  id: z.string(),
  email: emailSchema,
  name: z.string().min(1, 'Name is required'),
  avatar: z.string().optional(),
  role: z.enum(['admin', 'manager', 'member']).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  name: z.string().min(1, 'Name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const twoFactorSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
});

export const createTaskSchema = taskSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const updateTaskSchema = createTaskSchema.partial();

export const filterSchema = z.object({
  status: taskStatusSchema.optional(),
  priority: prioritySchema.optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type Subtask = z.infer<typeof subtaskSchema>;
export type User = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type TwoFactorInput = z.infer<typeof twoFactorSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type FilterInput = z.infer<typeof filterSchema>;

export function validateEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

export function validatePassword(password: string): boolean {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
}

export function validateTask(task: unknown): task is Task {
  try {
    taskSchema.parse(task);
    return true;
  } catch {
    return false;
  }
}

export function validateUser(user: unknown): user is User {
  try {
    userSchema.parse(user);
    return true;
  } catch {
    return false;
  }
}
