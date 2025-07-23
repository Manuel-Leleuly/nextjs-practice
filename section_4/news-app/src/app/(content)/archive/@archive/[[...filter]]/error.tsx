"use client";

import { PageError } from "@/models/models";

export default function FilterError({ error }: PageError) {
  return (
    <div id="error">
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}
