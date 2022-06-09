//import { Smile } from "react-feather";
//import { Picker } from "emoji-mart";

function MessageForm({
  emojiSelect,
  handleMessageSend,
  setShowEmojiPicker,
  showEmojiPicker,
  message,
  handleMessageChange,
}) {
  let messageInput;
  const handleEmojiSelect = (emoji) => {
    emojiSelect(emoji);
    messageInput.focus();
  };

  return (
    <div>
      {/*showEmojiPicker ? (
       <Picker title="" set="apple" onSelect={handleEmojiSelect} />
     ) : null*/}
      <form onSubmit={handleMessageSend} className="message-form">
        {/*}
       <button
         type="button"
         onClick={() => setShowEmojiPicker(!showEmojiPicker)}
         className="toggle-emoji"
       >
         <Smile />
    </button>*/}
        <input
          type="text"
          value={message}
          ref={(input) => (messageInput = input)}
          onChange={handleMessageChange}
          placeholder="Type your message here..."
          className="message-input"
        />
      </form>
    </div>
  );
}

export default MessageForm;
