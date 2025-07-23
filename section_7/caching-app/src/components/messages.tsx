import { Message } from "@/models/message";

export const Messages = ({ messages }: { messages: Message[] }) => {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
};
