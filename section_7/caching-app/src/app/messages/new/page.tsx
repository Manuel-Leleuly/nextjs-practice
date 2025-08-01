import { MessagesLib } from "@/lib/messages";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function NewMessagePage() {
  async function createMessage(formData: FormData) {
    "use server";

    const message = formData.get("message");
    if (!message) return;

    MessagesLib.addMessage(message.toString());
    // revalidatePath("/messages");
    revalidateTag("msg");
    redirect("/messages");
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows={5} />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
