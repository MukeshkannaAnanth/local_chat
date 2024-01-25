import { Box, Stack, TextField } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  TimeLine,
  Video,
  Audio,
} from "./MsgTypes";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Close } from '@mui/icons-material'; // Import the close icon component
import SendIcon from '@mui/icons-material/Send';
const Message = ({
  menu,
  senderid,
  receiverid,
  chathistory,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  closeEmoji,
  searchTerm,
  handlestar,
  star,
  setStar,
  handleUnstar,
  openModal,
  openModalImg,
  handelModelClose,
  handleModelImage,
  setInputValue
}) => {
  const [userid, setUsername] = useState("");
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData) {
      // Use the retrieved data as needed
      setUsername(authData.user.id);
    }

    const getTimeline = async () => {
      const gettimelines = await axios.post(
        "http://localhost:8001/chat/TimeLine"
      );
      setTimeline(gettimelines.data.data.message);
      console.log(gettimelines.data.data.message);
    };

    getTimeline();
  }, []);

  console.log(openModalImg);

  return (
    <>

<Box p={3} style={{
      height:"100vh",
    }}>
      <Stack spacing={3} >
        {/* {

  timeline.map((date)=>(
    <h1>{date.date_added}</h1>
    
  ))
} */}

        {chathistory.map((el) => {
          switch (el.type) {
            case "divider":
              return <TimeLine el={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    <MediaMsg
                      el={el}
                      menu={menu}
                      searchTerm={searchTerm}
                      setAnchorEls={0}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      getemoj={getemoj}
                      closeEmoji={closeEmoji}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      handleUnstar={handleUnstar}
                    />
                  );
                case "video":
                  return (
                    <Video
                      el={el}
                      menu={menu}
                      searchTerm={searchTerm}
                      setAnchorEls={0}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      getemoj={getemoj}
                      closeEmoji={closeEmoji}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      handleUnstar={handleUnstar}
                    />
                  );
                case "Audio":
                  return (
                    <Audio
                      el={el}
                      menu={menu}
                      searchTerm={searchTerm}
                      setAnchorEls={0}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      getemoj={getemoj}
                      closeEmoji={closeEmoji}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      handleUnstar={handleUnstar}
                    />
                  );
                case "doc":
                  return (
                    <DocMsg
                      el={el}
                      menu={menu}
                      searchTerm={searchTerm}
                      setAnchorEls={0}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      getemoj={getemoj}
                      closeEmoji={closeEmoji}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      handleUnstar={handleUnstar}
                    />
                  );

                case "link":
                  return (
                    <LinkMsg
                      el={el}
                      menu={menu}
                      searchTerm={searchTerm}
                      setAnchorEls={0}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      getemoj={getemoj}
                      closeEmoji={closeEmoji}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      handleUnstar={handleUnstar}
                    />
                  );
                case "reply":
                  return (
                    <ReplyMsg
                      el={el}
                      menu={menu}
                      searchTerm={searchTerm}
                      setAnchorEls={0}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      getemoj={getemoj}
                      closeEmoji={closeEmoji}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      handleUnstar={handleUnstar}
                    />
                  );

                default:
                  return (
                    <TextMsg
                      el={el}
                      menu={menu}
                      searchTerm={searchTerm}
                      setAnchorEls={0}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      getemoj={getemoj}
                      closeEmoji={closeEmoji}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      handleUnstar={handleUnstar}
                    />
                  );
              }
              break;

            default:
              return <></>;
          }
        })}

       
      </Stack>
     
    </Box>
    {openModal === 1 ? (
      // Import the close icon component
// ... (your other imports and code)
<Box
  sx={{
    width: 700,
    height: 500,
    bottom: 0,
    backgroundColor: 'white',
    position: 'fixed',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '20px',
  }}
>
  {/* Close icon */}
  <Close
    sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      cursor: 'pointer',
    }}
    onClick={() => {
      handelModelClose();
    }}
  />

  <div
    style={{
      backgroundColor: '#007bff',
      height: '40px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Content Viewer
  </div>

  <div
    style={{
      width: '90%',
      marginTop: '20px',
    }}
  >
    {openModalImg && (
      openModalImg.type.startsWith('image/') ? (
        <img
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
          src={URL.createObjectURL(openModalImg)}
          alt="Selected Image"
        />
      ) : openModalImg.type.startsWith('video/') ? (
        <video
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
          controls
        >
          <source src={URL.createObjectURL(openModalImg)} type={openModalImg.type} />
          Your browser does not support the video tag.
        </video>
      ) : openModalImg.type.startsWith('application/pdf') ? (
        <iframe
          src={URL.createObjectURL(openModalImg)}
          width="100%"
          height="300px"
          title="Document Viewer"
        ></iframe>
      ) : (
        // Add more conditions for other document types
        <div>
          Unsupported file type. Cannot preview.
        </div>
      )
    )}
  </div>

  {/* Content of your modal */}
  <div style={{ marginTop: 'auto', width: '80%', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
    <TextField
      onChange={(e) => setInputValue(e.target.value)}
      sx={{
        width: '100%',
        backgroundColor: '#f0f0f0',
      }}
      placeholder="Caption (Optional)"
    />
    <SendIcon style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '45px', fontWeight: 'bold' }} onClick={handleModelImage} />
  </div>
</Box>








) : null}

    </>
   
  );
};

export default Message;
