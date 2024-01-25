import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const ResponsiveDocumentViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="document-viewer-container">
      <Document
        file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="page-navigation">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous Page
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button onClick={handleNextPage} disabled={pageNumber === numPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ResponsiveDocumentViewer;
