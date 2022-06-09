function ChatMessages({ messagesLoading, messages }) {
  return (
    <>
      {messagesLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {messages.map((message) => (
            <div>
              {message.user}: {message.body}
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ChatMessages;
