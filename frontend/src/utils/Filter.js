import React, { useState } from 'react';

const HighlightTextExample = () => {
  const [originalArray, setOriginalArray] = useState([
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Mango',
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const highlightText = (text, highlight) => {
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.replace(regex, (match) => `<span style="background-color: yellow;">${match}</span>`);
  };

  const filteredArray = originalArray.map((item) => highlightText(item, searchTerm));

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredArray.map((highlightedItem, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: highlightedItem }} />
        ))}
      </ul>
    </div>
  );
};

export default HighlightTextExample;
