import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import React from "react";
import { senderreceiverImg, senderreceiverVideo } from "../../config/ServerUrl";
import ReactPlayer from "react-player";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import FileViewer from "react-file-viewer";
import CustomErrorComponent from "../../utils/CustomErrorComponent";
import PDFViewer from "../../utils/DocsViewer";
import ImgsViewer from "react-images-viewer";
import AudiosBlob from "../../utils/audio";
import TransitionsModal from "../../utils/ImageModel";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Popover from "@mui/material/Popover";
import Emoji from "../../utils/emojpicker";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useRef } from "react";
import { senderreceiverDoc } from "../../config/ServerUrl";

const DocMsg = ({
  el,
  menu,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  searchTerm,
  handlestar,
  star,
  handleUnstar,
}) => {
  const theme = useTheme();

  const openPdf = () => {};

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) {
      return text; // Return the original text if no search term is provided
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  const textRef = useRef(null);
  const handleCopyClick = async () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;

      try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(textToCopy);

        // Log success message or perform any additional action
        console.log("Text copied successfully! navigator");
      } catch (err) {
        // Handle errors or exceptions
        console.error("Unable to copy text. Please copy it manually.");
      }
    }
  };

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            direction="row"
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
        <iframe
  src={`${senderreceiverDoc}/${el.img}`}
  width="100%"
  height="300px"
  title="Document Viewer"
  style={{ zoom: 'scale(0.8)' }} // Adjust the scale value as needed
></iframe>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
            position="relative"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: highlightText(el.message, searchTerm),
              }}
              ref={textRef}
            />
            <div
              className="time"
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                float: "right",
                right: "0",
              }}
            >
              {el.star === "1" ? (
                <StarBorderIcon
                  style={{
                    fontSize: "16px",
                  }}
                />
              ) : null}
              &nbsp;&nbsp;
              {el.time}
            </div>

            {el.reaction ? (
              <img
                src={el.reaction}
                alt="Emoji"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-20px",
                  width: "20px",
                  height: "20px",
                  marginTop: "40px",
                }}
              />
            ) : null}
          </Typography>
        </Stack>
      </Box>
      {menu && (
        <MessageOptions
          id={el}
          handelmaindelete={handelmaindelete}
          ReplyMsgs={ReplyMsgs}
          getemoj={getemoj}
          handlestar={handlestar}
          handleUnstar={handleUnstar}
          handleCopyClick={handleCopyClick}
        />
      )}
    </Stack>
  );
};

const LinkMsg = ({
  el,
  menu,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  searchTerm,
  handlestar,
  handleUnstar,
  star,
}) => {
  const theme = useTheme();

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) {
      return text; // Return the original text if no search term is provided
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  const textRef = useRef(null);
  const handleCopyClick = async () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;

      try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(textToCopy);

        // Log success message or perform any additional action
        console.log("Text copied successfully! navigator");
      } catch (err) {
        // Handle errors or exceptions
        console.error("Unable to copy text. Please copy it manually.");
      }
    }
  };

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems="start"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={`https://i.pinimg.com/564x/34/b8/e8/34b8e8b08f42719fc2ef59199cfb995b.jpg`}
              alt={"Google Map"}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />

            <Typography
              variant="body2"
              color={el.incoming ? theme.palette.text : "#fff"}
              position="relative"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightText(el.message, searchTerm),
                }}
                ref={textRef}
              />
              <div
                className="time"
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  float: "right",
                  right: "0",
                }}
              >
                {el.star === "1" ? (
                  <StarBorderIcon
                    style={{
                      fontSize: "16px",
                    }}
                  />
                ) : null}
                &nbsp;&nbsp;
                {el.time}
              </div>

              {el.reaction ? (
                <img
                  src={el.reaction}
                  alt="Emoji"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "-20px",
                    width: "20px",
                    height: "20px",
                    marginTop: "40px",
                  }}
                />
              ) : null}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && (
        <MessageOptions
          id={el}
          handelmaindelete={handelmaindelete}
          ReplyMsgs={ReplyMsgs}
          getemoj={getemoj}
          handlestar={handlestar}
          handleUnstar={handleUnstar}
          handleCopyClick={handleCopyClick}
        />
      )}
    </Stack>
  );
};

const ReplyMsg = ({
  el,
  menu,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  searchTerm,
  handlestar,
  star,
  handleUnstar,
}) => {
  const theme = useTheme();
  const searchtext = searchTerm;

  const highlightText = (text, searchtext) => {
    if (!searchTerm) {
      return text; // Return the original text if no search term is provided
    }

    const regex = new RegExp(`(${searchtext})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  const textRef = useRef(null);
  const handleCopyClick = async () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;

      try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(textToCopy);

        // Log success message or perform any additional action
        console.log("Text copied successfully! navigator");
      } catch (err) {
        // Handle errors or exceptions
        console.error("Unable to copy text. Please copy it manually.");
      }
    }
  };

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{ backgroundColor: "#f0e7e6", borderRadius: 1 }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightText(el.message, searchtext),
                }}
                ref={textRef}
              />
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
            position="relative"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: highlightText(el.reply, searchtext),
              }}
            />
            <div
              className="time"
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                float: "right",
                right: "0",
              }}
            >
              {el.star === "1" ? (
                <StarBorderIcon
                  style={{
                    fontSize: "16px",
                  }}
                />
              ) : null}
              {el.time}
            </div>
            &nbsp;&nbsp;
            {el.reaction ? (
              <img
                src={el.reaction}
                alt="Emoji"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-20px",
                  width: "20px",
                  height: "20px",
                  marginTop: "40px",
                }}
              />
            ) : null}
          </Typography>
        </Stack>
      </Box>
      {menu && (
        <MessageOptions
          id={el}
          handelmaindelete={handelmaindelete}
          ReplyMsgs={ReplyMsgs}
          getemoj={getemoj}
          handlestar={handlestar}
          handleUnstar={handleUnstar}
          handleCopyClick={handleCopyClick}
        />
      )}
    </Stack>
  );
};

const MediaMsg = ({
  el,
  menu,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  searchTerm,
  handlestar,
  star,
  handleUnstar,
}) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const openLightbox = () => {
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIsImageLoaded(false); // Reset the loaded state when closing the lightbox
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) {
      return text; // Return the original text if no search term is provided
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  const textRef = useRef(null);
  const handleCopyClick = async () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;

      try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(textToCopy);

        // Log success message or perform any additional action
        console.log("Text copied successfully! navigator");
      } catch (err) {
        // Handle errors or exceptions
        console.error("Unable to copy text. Please copy it manually.");
      }
    }
  };

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
      >
        <Stack spacing={1}>
          <img
            src={`${senderreceiverImg}/${el.img}`}
            alt={el.message}
            onClick={openLightbox}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          {isOpen && (
            <Lightbox
              mainSrc={`${senderreceiverImg}/${el.img}`}
              onCloseRequest={closeLightbox}
              imageLoadErrorMessage="Failed to load image"
              reactModalStyle={{ overlay: { zIndex: 2000 } }}
              onImageLoad={handleImageLoad}
              animationDuration={500}
              imageCaption="Your Image Caption"
              nextSrc={null}
              prevSrc={null}
            />
          )}

          {/* Loader while the image is loading */}
          {isOpen && !isImageLoaded && <div>Loading...</div>}

          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
            position="relative"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: highlightText(el.message, searchTerm),
              }}
              ref={textRef}
            />
            <div
              className="time"
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                float: "right",
                right: "0",
              }}
            >
              {el.star === "1" ? (
                <StarBorderIcon
                  style={{
                    fontSize: "16px",
                  }}
                />
              ) : null}
              &nbsp;&nbsp;
              {el.time}
            </div>

            {el.reaction ? (
              <img
                src={el.reaction}
                alt="Emoji"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-20px",
                  width: "20px",
                  height: "20px",
                  marginTop: "40px",
                }}
              />
            ) : null}
          </Typography>
        </Stack>
      </Box>
      {menu && (
        <MessageOptions
          id={el}
          handelmaindelete={handelmaindelete}
          ReplyMsgs={ReplyMsgs}
          getemoj={getemoj}
          handlestar={handlestar}
          handleUnstar={handleUnstar}
          handleCopyClick={handleCopyClick}
        />
      )}
    </Stack>
  );
};

const Audio = ({
  el,
  menu,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  searchTerm,
  handlestar,
  star,
  handleUnstar,
}) => {
  const theme = useTheme();

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) {
      return text; // Return the original text if no search term is provided
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  const textRef = useRef(null);
  const handleCopyClick = async () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;

      try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(textToCopy);

        // Log success message or perform any additional action
        console.log("Text copied successfully! navigator");
      } catch (err) {
        // Handle errors or exceptions
        console.error("Unable to copy text. Please copy it manually.");
      }
    }
  };

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <AudiosBlob blob_url={el.blob_url} />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
            position="relative"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: highlightText(el.message, searchTerm),
              }}
              ref={textRef}
            />
            <div
              className="time"
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                float: "right",
                right: "0",
              }}
            >
              {el.star === "1" ? (
                <StarBorderIcon
                  style={{
                    fontSize: "16px",
                  }}
                />
              ) : null}
              &nbsp;&nbsp;
              {el.time}
            </div>

            {el.reaction ? (
              <img
                src={el.reaction}
                alt="Emoji"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-20px",
                  width: "20px",
                  height: "20px",
                  marginTop: "40px",
                }}
              />
            ) : null}
          </Typography>
        </Stack>
      </Box>
      {menu && (
        <MessageOptions
          id={el}
          handelmaindelete={handelmaindelete}
          ReplyMsgs={ReplyMsgs}
          getemoj={getemoj}
          handlestar={handlestar}
          handleUnstar={handleUnstar}
          handleCopyClick={handleCopyClick}
        />
      )}
    </Stack>
  );
};

const Video = ({
  el,
  menu,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  searchTerm,
  handlestar,
  star,
  handleUnstar,
}) => {
  const theme = useTheme();

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) {
      return text; // Return the original text if no search term is provided
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  const textRef = useRef(null);
  const handleCopyClick = async () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;

      try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(textToCopy);

        // Log success message or perform any additional action
        console.log("Text copied successfully! navigator");
      } catch (err) {
        // Handle errors or exceptions
        console.error("Unable to copy text. Please copy it manually.");
      }
    }
  };

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
      >
        <Stack spacing={1}>
          <ReactPlayer
            url={`${senderreceiverVideo}/${el.img}`}
            width="300px" // Set your desired width
            height="200px"
            controls // Set your desired height
          />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
            position="relative"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: highlightText(el.message, searchTerm),
              }}
              ref={textRef}
            />
            <div
              className="time"
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                float: "right",
                right: "0",
              }}
            >
              {el.star === "1" ? (
                <StarBorderIcon
                  style={{
                    fontSize: "16px",
                  }}
                />
              ) : null}
              &nbsp;&nbsp;
              {el.time}
            </div>
            {el.reaction ? (
              <img
                src={el.reaction}
                alt="Emoji"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-20px",
                  width: "20px",
                  height: "20px",
                  marginTop: "40px",
                }}
              />
            ) : null}
          </Typography>
        </Stack>
      </Box>
      {menu && (
        <MessageOptions
          id={el}
          handelmaindelete={handelmaindelete}
          ReplyMsgs={ReplyMsgs}
          getemoj={getemoj}
          handlestar={handlestar}
          handleUnstar={handleUnstar}
          handleCopyClick={handleCopyClick}
        />
      )}
    </Stack>
  );
};

const TextMsg = ({
  el,
  menu,
  handledelete,
  setAnchorEls,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  closeEmoji,
  searchTerm,
  handlestar,
  star,
  handleUnstar,
}) => {
  const theme = useTheme();
  const textRef = useRef(null);

  console.log(el.star === "1");
  // Function to highlight text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) {
      return text; // Return the original text if no search term is provided
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  const handleCopyClick = async () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;

      try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(textToCopy);

        // Log success message or perform any additional action
        console.log("Text copied successfully! navigator");
      } catch (err) {
        // Handle errors or exceptions
        console.error("Unable to copy text. Please copy it manually.");
      }
    }
  };

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          position: "relative",
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
          position="relative"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: highlightText(el.message, searchTerm),
            }}
            ref={textRef}
          />
          <div
            className="time"
            style={{
              fontSize: "10px",
              fontWeight: "bold",
              float: "right",
            }}
          >
            {el.star === "1" ? (
              <StarBorderIcon
                style={{
                  fontSize: "16px",
                }}
              />
            ) : null}
            &nbsp;&nbsp;{el.time}
          </div>

          {/* Emoji image positioned absolutely */}
          {el.reaction ? (
            <img
              src={el.reaction}
              alt="Emoji"
              style={{
                position: "absolute",
                top: "0",
                right: "-20px",
                width: "20px",
                height: "20px",
                marginTop: "40px",
              }}
            />
          ) : null}
        </Typography>
      </Box>
      {menu && (
        <MessageOptions
          id={el}
          handelmaindelete={handelmaindelete}
          ReplyMsgs={ReplyMsgs}
          getemoj={getemoj}
          closeEmoj={closeEmoji}
          handlestar={handlestar}
          star={star}
          handleUnstar={handleUnstar}
          handleCopyClick={handleCopyClick}
        />
      )}
    </Stack>
  );
};

const TimeLine = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const MessageOptions = ({
  id,
  handledelete,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  closeEmoj,
  handlestar,
  setStar,
  handleCopyClick,
  handleUnstar,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const [clickemoj, setClickEmoj] = React.useState(0);
  const open = Boolean(anchorEl);

  const Text_options = [
    {
      title: "Reply",
    },
    {
      title: "React to message",
    },
    {
      title: "Forward message",
    },

    {
      title: "Delete Message",
    },
    {
      title: id.star === "1" ? "Unstar" : "Star",
    },
    {
      title: "Copy",
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickEmoji = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
    setAnchorEl(null);
  };

  const datavaliadate = (id) => {
    handelmaindelete(id);
    setAnchorEl(null);
  };

  const handelReplyMsg = (e, data) => {
    ReplyMsgs(e, data);
  };
  const handleClickemoj = (emojiObject) => {
    getemoj(emojiObject);

    setIsOverlayVisible(true);
  };

  const handleEmoj = () => {
    setClickEmoj(1);
    setIsOverlayVisible(true);
  };

  const handleClickemojs = (emojiObject) => {
    getemoj(emojiObject, id);

    setIsOverlayVisible(closeEmoj);
    setAnchorEl(null);
  };

  const handlestars = (e, id) => {
    handlestar(e, id);
    setAnchorEl(null);
  };

  const handleUnstars = (e, id) => {
    handleUnstar(e, id);
    setAnchorEl(null);
  };

  const handleCopyText = () => {
    handleCopyClick();
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Text_options.map((el) => (
            <>
              <MenuItem
                onClick={(e) => {
                  if (el.title.trim() == "Delete Message") {
                    datavaliadate(id);
                  } else if (el.title.trim() == "Reply") {
                    handelReplyMsg(e, id);
                  } else if (el.title.trim() == "React to message") {
                    handleClickemoj();
                  } else if (el.title.trim() == "Star") {
                    handlestars(e, id);
                  } else if (el.title.trim() == "Unstar") {
                    handleUnstars(e, id);
                  } else if (el.title.trim() == "Copy") {
                    handleCopyText(e, id);
                  }
                }}
              >
                {el.title}
              </MenuItem>
              <div></div>
            </>
          ))}

          {isOverlayVisible && (
            <div>
              {/* Close button */}
              <CloseIcon onClick={handleCloseOverlay} />

              {/* Emoji component or additional content */}
              <Emoji onEmojiClick={handleClickemojs} />
              {/* Add other content here if needed */}
            </div>
          )}
        </Stack>
      </Menu>
    </>
  );
};

// should not be default export, because we need to export multiple things
export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg, Video, Audio };
