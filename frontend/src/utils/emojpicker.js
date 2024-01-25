// Filename - App.js
 
import React, { useState } from "react";
import Picker from "emoji-picker-react";
 
export default function Emoji({onEmojiClick}) {
   
 
    return (
        <div>
          
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    );
}