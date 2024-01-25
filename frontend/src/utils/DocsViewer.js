import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewer = ({ pdfUrl,openPdf }) => {
  
  return (
    <div style={{ height: '100px',width:'300px' }} onclick={openPdf}>
      <Viewer fileUrl='http://localhost:8001/assets/SndRcvdPDF/pdf-1705133500113.pdf'/>
    </div>
  );
};

export default PDFViewer;
