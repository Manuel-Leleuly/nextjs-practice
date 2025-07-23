"use client";

import { PageError } from "@/models/models";

export default function FeedError(_: PageError) {
  return (
    <>
      <h2>An error occurred!</h2>
      <p>Unfortunately, something went wrong. We're working on it!</p>
    </>
  );
}
