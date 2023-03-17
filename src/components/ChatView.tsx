import { useAppContext } from "~/context/AppContext";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { type FormValues } from "~/components/PasteForm";

type FilteredMessages = FormValues & { id: string };
function ChatView() {
  const { rewind } = useAppContext();
  const [filteredMessages, setFilteredMessages] = useState<FilteredMessages[]>(
    []
  );

  const filtered = useMemo(() => {
    return rewind
      .filter((message) => message.user !== null)
      .map((message) => {
        return { ...message, id: uuid() };
      });
  }, [rewind]);

  useEffect(() => {
    const chatWindow = document.querySelector("#chatWindow");
    chatWindow?.scrollTo({
      top: chatWindow.scrollHeight - 100,
      behavior: "smooth",
    });

    setFilteredMessages(filtered);
  }, [filtered, rewind]);

  const handleDelete = (target: string) => {
    const deleted = filteredMessages.filter((message) => message.id !== target);
    setFilteredMessages(deleted);
  };

  return (
    <div className="flex w-1/2 flex-col items-center justify-center">
      <div className="h-[60vh] w-full overflow-scroll pb-10" id="chatWindow">
        {filteredMessages.map((message) => (
          <div key={message.id} className="group chat chat-end items-center">
            <div className="chat-header">{message.user}</div>
            <div className="chat-bubble pr-8">{message.messageContent}</div>
            <button
              onClick={() => handleDelete(message.id)}
              className="btn-outline btn-square btn-sm btn hidden group-hover:inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button className="btn-outline btn-accent btn-wide btn">Rewind</button>
    </div>
  );
}
export default ChatView;
