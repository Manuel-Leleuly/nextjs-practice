import { MessagesLib } from "@/lib/messages";
import { PageLayout } from "@/models/models";

export default async function MessagesLayout({ children }: PageLayout) {
  // const response = await fetch("http://localhost:8080/messages", {
  //   headers: {
  //     "X-ID": "layout",
  //   },
  // });
  // const messages = await response.json();
  const messages = await MessagesLib.getMessages();
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}
