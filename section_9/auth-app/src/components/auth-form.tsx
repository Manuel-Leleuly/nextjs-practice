"use client";

import { auth } from "@/actions/auth-actions";
import { ObjectUtils } from "@/utils/objectUtils";
import Link from "next/link";
import { useActionState } from "react";

export const AuthForm = ({ mode }: { mode: string }) => {
  const [formState, formAction] = useActionState(auth.bind(null, mode), {
    errors: null,
  });

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {ObjectUtils.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors?.[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account.</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
};
