"use client";

import { useFormStatus } from "react-dom";

export const FormSubmit = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return "Creating post...";
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};
