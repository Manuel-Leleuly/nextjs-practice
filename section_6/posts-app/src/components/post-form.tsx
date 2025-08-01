"use client";

import { useActionState } from "react";
import { FormSubmit } from "./form-submit";

interface Props {
  createPost: (
    state: { errors: string[] | null },
    formData: FormData
  ) => Promise<{ errors: string[] }>;
}

export const PostForm = ({ createPost }: Props) => {
  const [state, formAction] = useActionState<
    { errors: string[] | null },
    FormData
  >(createPost, { errors: null });

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
      {state.errors && (
        <ul className="form-errors">
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </>
  );
};
