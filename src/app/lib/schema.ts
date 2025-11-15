import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8),
});

export type Login = z.infer<typeof LoginSchema>;

export const PopulatedUserSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  teamName: z.string(),
  teamImage: z.string(),
  image: z.string(),
  type: z.string(),
});

export type PopulatedUser = z.infer<typeof PopulatedUserSchema>;

export const PropertySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  reference: z.string().min(1),
  address: z.string().min(1),
  floor: z.string().min(1),
  door: z.string().min(1),
  notes: z.string().nullable(),
});

export type Property = z.infer<typeof PropertySchema>;

export const CreatePropertySchema = PropertySchema.omit({ id: true });

export type CreateProperty = z.infer<typeof CreatePropertySchema>;

const userType = ["admin", "user"] as const;

const UserTypeEnum = z.enum(userType);
export type UserTypeEnum = z.infer<typeof UserTypeEnum>;

export const UserSchema = z.object({
  id: z.string().min(1),
  email: z.email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
  teamId: z.string().min(1),
  type: UserTypeEnum,
  language: z.string().min(1),
  image: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  email: z.email().min(1),
  type: UserTypeEnum,
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

export const CreateUserWithTeamSchema = z.object({
  email: z.email().min(1),
  teamName: z.string().min(1),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export type CreateUserWithTeam = z.infer<typeof CreateUserWithTeamSchema>;

export const UpdateUserSchema = z.object({
  email: z.email().min(1),
  type: UserTypeEnum,
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const UpdateProfileSchema = z.object({
  email: z.email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

const status = ["pending", "in_progress", "completed"] as const;

const TaskStatusEnum = z.enum(status);
export type TaskStatusEnum = z.infer<typeof TaskStatusEnum>;

const priority = ["low", "medium", "high"] as const;

const TaskPriorityEnum = z.enum(priority);
export type TaskPriorityEnum = z.infer<typeof TaskPriorityEnum>;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  propertyId: z.string().min(1),
  assignedTo: z
    .string()
    .nullable()
    .transform((str) => (str ? str : null)),
  files: z.string().array().default([]),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  notes: z
    .string()
    .nullable()
    .transform((str) => (str ? str : null)),
  dueDate: z
    .union([z.coerce.date(), z.literal(""), z.null(), z.undefined()])
    .transform((val) => (val === "" || val === undefined ? null : val))
    .default(null),
  completedDate: z
    .union([z.coerce.date(), z.literal(""), z.null(), z.undefined()])
    .transform((val) => (val === "" || val === undefined ? null : val))
    .default(null),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTask = z.infer<typeof CreateTaskSchema>;
const availability = [
  "available",
  "checkin",
  "checkout",
  "checkin_checkout",
  "unavailable",
] as const;

const AvailabilityEnum = z.enum(availability);
export type AvailabilityEnum = z.infer<typeof AvailabilityEnum>;

export interface PopulatedTask extends Task {
  propertyName: string;
  propertyAddress: string;
  propertyFloor: string;
  propertyDoor: string;
  availability: AvailabilityEnum;
  assignedToName: string;
  propertyNotes: string;
}

const plan = ["free", "basic", "premium", "enterprise"] as const;

const PlanTypeEnum = z.enum(plan);
export type PlanTypeEnum = z.infer<typeof PlanTypeEnum>;

export const TeamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  image: z.string().min(1),
  plan: PlanTypeEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Team = z.infer<typeof TeamSchema>;

export const CreateTeamSchema = TeamSchema.omit({ id: true });

export type CreateTeam = z.infer<typeof CreateTeamSchema>;

export const UpdateTeamSchema = z.object({
  name: z.string().min(1),
});

export type UpdateTeam = z.infer<typeof UpdateTeamSchema>;

export const UsageSchema = z.object({
  numProperties: z.number().min(1),
  numAllowedProperties: z.number().min(1),
  numAllowedUsers: z.number().min(1),
  numUsers: z.number().min(1),
});

export type Usage = z.infer<typeof UsageSchema>;

export const TaskEventSchema = z.object({
  taskId: z.string().min(1),
  priority: TaskPriorityEnum,
  title: z.string().min(1),
  start: z.date(),
});

export type TaskEvent = z.infer<typeof TaskEventSchema>;
