"use server";

import { AuthLib } from "@/lib/auth";
import { HashLib } from "@/lib/hash";
import { UserLib } from "@/lib/user";
import { AddParameters, FormStateFunction } from "@/models/models";
import { ObjectUtils } from "@/utils/objectUtils";
import { SqliteError } from "better-sqlite3";
import { redirect } from "next/navigation";

export type FormStateError = {
  errors: Record<string, any> | null;
};

export const signup: FormStateFunction<FormStateError> = async (
  _,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors: Record<string, string> = {};

  if (!email?.toString().includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!!password && password.toString().trim().length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!!ObjectUtils.keys(errors).length) {
    return { errors };
  }

  const hashedPassword = HashLib.hashUserPassword(password?.toString() ?? "");
  try {
    const id = UserLib.createUser(email?.toString() ?? "", hashedPassword);
    await AuthLib.createAuthSession(id as number);
    redirect("/training");
  } catch (error) {
    if (error instanceof SqliteError) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return {
          errors: {
            email:
              "It seems like an account for the chosen email already exists.",
          },
        };
      }
    }

    throw error;
  }
};

export const login: FormStateFunction<FormStateError> = async (_, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = UserLib.getUserByEmail(email?.toString() ?? "");
  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  const isValidPassword = HashLib.verifyPassword(
    existingUser.password,
    password?.toString() ?? ""
  );
  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  await AuthLib.createAuthSession(existingUser.id);
  redirect("/training");
};

export const auth: AddParameters<
  FormStateFunction<FormStateError>,
  [mode: string],
  "insert"
> = async (mode, prevState, formData) => {
  if (mode === "login") {
    return await login(prevState, formData);
  }
  return await signup(prevState, formData);
};

export const logout = async () => {
  await AuthLib.destroySession();
  redirect("/");
};
