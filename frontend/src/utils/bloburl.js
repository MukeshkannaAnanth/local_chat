import React, { useState, useEffect } from 'react';

const Blobaudios = ({ blobUrl }) => {
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    // Fetch the Blob data from the Blob URL
    fetch('blob:http://localhost:3000/66646607-2b28-471a-857e-a980ba6fa731')
      .then(response => response.blob())
      .then(blob => setAudioBlob(blob))
      .catch(error => console.error('Error fetching Blob data:', error));

    // Cleanup: Revoke the Blob URL when the component is unmounted or when the Blob URL is no longer needed
    return () => URL.revokeObjectURL(blobUrl);
  }, [blobUrl]);

  const downloadAudioFile = () => {
    if (audioBlob) {
      // Create a download link and trigger the download
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'audiofile.mp3'; // Set a desired filename
      a.click();
      URL.revokeObjectURL(url); // Cleanup the URL
    }
  };

  return (
    <div>
      {/* Display audio player or other components using audioBlob as needed */}
      {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} />}
      
      {/* Example: Button to download the audio file */}
      <button onClick={downloadAudioFile}>Download Audio</button>
    </div>
  );
};

export default Blobaudios;
