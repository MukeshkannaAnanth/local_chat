import React, { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';

const ChatApplication = () => {
  const [messages, setMessages] = useState([]);

  const handleSendSticker = (stickerImage) => {
    const newMessage = {
      type: 'sticker',
      content: stickerImage,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <Stage width={400} height={400}>
        <Layer>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </Layer>
      </Stage>

      <StickerPicker onStickerClick={handleSendSticker} />
    </div>
  );
};

const Message = ({ message }) => {
  if (message.type === 'sticker') {
    return <Image image={message.content} />;
  }

  // Handle other message types if needed

  return null;
};

const StickerPicker = ({ onStickerClick }) => {
  // Example sticker images (replace with your actual stickers)
  const stickers = ['path/to/sticker1.png', 'path/to/sticker2.png', 'path/to/sticker3.png'];

  return (
    <div>
      <p>Sticker Picker</p>
      {stickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker}
          alt={`Sticker ${index + 1}`}
          onClick={() => onStickerClick(sticker)}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        />
      ))}
    </div>
  );
};

export default ChatApplication;
