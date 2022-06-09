import ChatMessages from "./ChatMessages";
import MessageForm from "./MessageForm";

function ChatScreen({
  channel,
  messagesLoading,
  messages,
  showEmojiPicker,
  handleEmojiSelect,
  handleMessageSend,
  setShowEmojiPicker,
  message,
  handleMessageChange,
}) {
  return (
    <section className="chat-screen">
      <header className="chat-header">
        <h3>#{channel}</h3>
      </header>
      <ChatMessages messagesLoading={messagesLoading} messages={messages} />
      <footer className="chat-footer">
        <MessageForm
          emojiSelect={handleEmojiSelect}
          handleMessageSend={handleMessageSend}
          setShowEmojiPicker={setShowEmojiPicker}
          showEmojiPicker={showEmojiPicker}
          message={message}
          handleMessageChange={handleMessageChange}
        />
      </footer>
    </section>
  );
}

export default ChatScreen;
