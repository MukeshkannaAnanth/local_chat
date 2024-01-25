import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudiosBlob = ({ blob_url }) => {
  const blobUrl = "blob:http://localhost:3000/43b8a47f-6764-4a1b-8196-2ea9fc55ae68";

  const handlePlay = (blobUrl) => {
    const audio = new Audio(blobUrl);
    audio.play();
  };


  return (
    <div>
  
      <ReactAudioPlayer
        src={blob_url}
        controls
        onPlay={() => console.log("onPlay")}
      />
    </div>
  );
};

export default AudiosBlob;
