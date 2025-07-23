"use client";

import { PageError } from "@/models/models";

export default function NewPostError({ error }: PageError) {
  return (
    <>
      <h2>An error occurred!</h2>
      <p>Unfortunately, something went wrong.</p>
      <p>{error.message}</p>
    </>
  );
}
