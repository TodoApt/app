"use server";

import { auth, signIn, unstable_update } from "@/auth";
import { AuthError } from "next-auth";
import {
  LoginSchema,
  CreatePropertySchema,
  CreateTaskSchema,
  TaskStatusEnum,
  CreateUserSchema,
  UpdateTeamSchema,
  UpdateUserSchema,
  UpdateProfileSchema,
  CreateUserWithTeamSchema,
} from "@/app/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";
import { getTask } from "@/app/lib/data";

type FormState = {
  errors?: {
    [key: string]: string[];
  };
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = LoginSchema.parse({ email, password });

    await signIn("credentials", result);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createProperty(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = CreatePropertySchema.safeParse({
    name: formData.get("name"),
    reference: formData.get("reference"),
    address: formData.get("address"),
    floor: formData.get("floor"),
    door: formData.get("door"),
    notes: formData.get("notes"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  revalidatePath("/properties");
  redirect("/properties");
}

export async function deleteProperty(id: string) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/property/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  revalidatePath("/properties");
}

export async function updateProperty(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = CreatePropertySchema.safeParse({
    name: formData.get("name"),
    reference: formData.get("reference"),
    address: formData.get("address"),
    floor: formData.get("floor"),
    door: formData.get("door"),
    notes: formData.get("notes"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/property/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  revalidatePath("/properties");
  redirect("/properties");
}

export async function createTask(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = CreateTaskSchema.safeParse({
    ...Object.fromEntries(formData),
    files: formData.getAll("files"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateTask(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = CreateTaskSchema.safeParse({
    ...Object.fromEntries(formData),
    files: formData.getAll("files"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/task/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  revalidatePath("/");
  redirect("/");
}

export async function assignTask(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const task = await getTask(id);

  const result = CreateTaskSchema.safeParse({
    ...task,
    ...Object.fromEntries(formData),
    files: formData.getAll("files"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/task/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  revalidatePath("/calendar");
  redirect("/calendar");
}

export async function deleteTask(id: string) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  revalidatePath("/");
}

export async function changeTaskStatus(id: string, status: TaskStatusEnum) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/task/status/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({ status }),
  });

  revalidatePath("/");
}

export async function generateTask(
  prevState: string | undefined,
  formData: FormData,
) {
  const session = await auth();

  const input = formData.get("input") as string;

  const response = await fetch(`${process.env.API_URL}/task/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({ input }),
  });

  if (!response.ok) {
    return "Invalid prompt";
  }

  const result = await response.json();

  revalidatePath("/");
  redirect(`/edit/${result.id}`);
}

export async function registerPushSubscription(content: string) {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/push`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({ content }),
  });

  return await response.json();
}

export const deletePushSubscription = async (id: string) => {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/push/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  return await response.json();
};

export const changeLocale = async (locale: string) => {
  const cookieStore = await cookies();
  cookieStore.set("locale", locale);

  revalidatePath("/");
  redirect("/settings");
};

export async function createUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = CreateUserSchema.safeParse({
    email: formData.get("email"),
    type: formData.get("type"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  revalidatePath("/users");
  redirect("/users");
}

export async function updateUser(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = UpdateUserSchema.safeParse({
    type: formData.get("type"),
    email: formData.get("email"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  revalidatePath("/users");
  redirect("/users");
}

export async function deleteUser(id: string) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  revalidatePath("/users");
}

export async function updateUserLanguage(id: string, language: string) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({
      language,
    }),
  });
}

export async function updateTeam(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = UpdateTeamSchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/team/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  if (session) {
    await unstable_update({
      ...session,
      user: {
        ...session.user,
        teamName: result.data.name,
      },
    });
  }

  revalidatePath("/team");
  redirect("/team");
}

export async function updateTeamImage(id: string, image: string) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/team/${id}/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({ image }),
  });

  if (session) {
    await unstable_update({
      ...session,
      user: {
        ...session.user,
        teamImage: image,
      },
    });
  }

  revalidatePath("/team");
  redirect("/team");
}

export async function deleteTeamImage(id: string) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/team/${id}/image`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (session) {
    await unstable_update({
      ...session,
      user: {
        ...session.user,
        teamImage: undefined,
      },
    });
  }

  revalidatePath("/team");
  redirect("/team");
}

export async function updateUserImage(image: string) {
  const session = await auth();

  await fetch(`${process.env.API_URL}/user/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({ image }),
  });

  if (session) {
    await unstable_update({
      ...session,
      user: {
        ...session.user,
        image,
      },
    });
  }

  revalidatePath("/profile");
  redirect("/profile");
}

export async function deleteUserImage() {
  const session = await auth();

  await fetch(`${process.env.API_URL}/user/image`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (session) {
    await unstable_update({
      ...session,
      user: {
        ...session.user,
        image: undefined,
      },
    });
  }

  revalidatePath("/profile");
  redirect("/profile");
}

export async function updateProfile(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = UpdateProfileSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  if (session) {
    await unstable_update({
      ...session,
      user: {
        ...session.user,
        ...result.data,
      },
    });
  }

  revalidatePath("/profile");
  redirect("/profile");
}

export async function requestResetPassword(
  prevState: { state?: string; message?: string },
  formData: FormData,
) {
  const email = formData.get("email") as string;

  const response = await fetch(
    `${process.env.API_URL}/auth/request-reset-password`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    return {
      status: "ERROR",
      message: "Error resetting password",
    };
  }

  return {
    status: "SUCCESS",
    message: "Reset link sent",
  };
}

export async function resetPasswordAction(
  token: string,
  prevState: { state?: string; message?: string },
  formData: FormData,
) {
  const password = formData.get("password") as string;

  const response = await fetch(`${process.env.API_URL}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify({
      token: token,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      status: "ERROR",
      message: "Error resetting password",
    };
  }

  return {
    status: "SUCCESS",
    message: "Password updated successfully",
  };
}

export async function registerUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const inviteToken = formData.get("inviteToken");

  const result = CreateUserWithTeamSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    teamName: formData.get("teamName"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  if (process.env.INVITE_TOKEN && inviteToken !== process.env.INVITE_TOKEN) {
    return {
      errors: { inviteToken: ["Invalid invite token"] },
    };
  }

  const session = await auth();

  await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(result.data),
  });

  redirect("/auth/login");
}
