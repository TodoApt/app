import {
  PopulatedTask,
  Property,
  TaskEvent,
  Team,
  Usage,
  User,
} from "@/app/lib/schema";
import { auth } from "@/auth";
import { getDateInUTC } from "@/utils/date";

export const toQueryString = (
  filters: Record<string, string | number | Date | null>,
) =>
  Object.keys(filters).reduce(
    (acc, key) =>
      filters[key] !== null && filters[key] !== ""
        ? { ...acc, [key]: queryValue(filters[key]) }
        : acc,
    {},
  );

const queryValue = (value: string | number | Date) => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return getDateInUTC(value).toISOString();
};

export const getProperties = async (
  filters: Record<string, string> = {},
): Promise<Property[]> => {
  const session = await auth();

  const query = new URLSearchParams(toQueryString(filters));

  const response = await fetch(`${process.env.API_URL}/property?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!response.ok) {
    return [];
  }

  return await response.json();
};

export const getProperty = async (
  id: string,
): Promise<Property | undefined> => {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/property/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const getUsers = async (
  filters: Record<string, string> = {},
): Promise<User[]> => {
  const session = await auth();

  const query = new URLSearchParams(toQueryString(filters));

  const response = await fetch(`${process.env.API_URL}/user?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!response.ok) {
    return [];
  }

  return await response.json();
};

export const getTasks = async (
  filters: Record<string, string | number> = {},
): Promise<{
  data: PopulatedTask[];
  offset: number;
  limit: number;
  total: number;
}> => {
  const session = await auth();

  const offset = filters.offset ? (filters.offset as number) : 0;
  const limit = filters.limit ? (filters.limit as number) : 25;

  const query = new URLSearchParams(
    toQueryString({ ...filters, offset, limit }),
  );

  const response = await fetch(`${process.env.API_URL}/task?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!response.ok) {
    return { data: [], total: 0, limit, offset };
  }

  return await response.json();
};

export const getTask = async (
  id: string,
): Promise<PopulatedTask | undefined> => {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/task/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const getUser = async (id: string): Promise<User | undefined> => {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const getTaskEvents = async (
  filters: Record<string, any>,
): Promise<TaskEvent[]> => {
  const session = await auth();

  const query = new URLSearchParams(
    toQueryString({
      start: filters.start || new Date(),
      end: filters.end || new Date("2025-12-01"),
    }),
  );

  const response = await fetch(`${process.env.API_URL}/task/events?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  return await response.json();
};

export const getTeam = async (id: string): Promise<Team | undefined> => {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/team/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  return await response.json();
};

export const getTeamUsage = async (): Promise<Usage> => {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/team/usage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  return await response.json();
};
