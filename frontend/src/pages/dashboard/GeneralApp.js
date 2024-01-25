import React from "react";
// import Chats from "./Chats";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Fab,
  InputAdornment,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import { IconButton, Button, Divider, Tooltip } from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChatList } from "../../data";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Conversation from "../../components/Conversation";
import Header from "../../components/Conversation/Header";
// import Footer from "../../components/Conversation/Footer";
import Message from "../../components/Conversation/Message";
import YourComponentFotter from "../../components/Conversation/Footer";
import {
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Camera,
  File,
  Image,
  Sticker,
  User,
  Microphone,
} from "phosphor-react";
import { chatserverUrl, serverUrl } from "../../config/ServerUrl";
import { useNavigate } from "react-router-dom";
import StartChat from "../../components/StartChat";
import { Scrollbars } from "react-custom-scrollbars";
import { ReactMic } from "react-mic";
import CloseIcon from "@mui/icons-material/Close";
import { AudioRecorder } from "react-audio-voice-recorder";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import Emoji from "../../utils/emojpicker";
// import AudioPlayer from "../../utils/audio";
import ReactAudioPlayer from "react-audio-player";
import "react-h5-audio-player/lib/styles.css";
import MediaPlayer from "../../utils/audio";
import AudiosBlob from "../../utils/audio";
// import AudioRecorderComponent from "../../utils/audio";
import SingleImageViewer from "../../utils/ImageModel";
import FilterArrayExample from "../../utils/Filter";
import HighlightTextExample from "../../utils/Filter";

import ChatApplication from "../../utils/Stickers";
import TextCopy from "../../utils/CopyText";

import BasicModal from "../../utils/Model";


const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#0159b2",
    icon: <ShareLocationIcon size={24} />,
    y: 312,
    title: "ShareLocation",
  },
];

const ChatInput = ({
  inputValue,
  handleChange,
  setOpenPicker,
  handleSendmessage,
  handleClear,
  fileInputRef,
  handleFileChange,
  handleButtonClick,
  handleDocsFileChange,
  handleDocsButtonClick,
  setInputValue,
  onData,
  setTogetblob,
  stopRecording,
  startRecording,
  microphone,
  clearInput,
  handleShareLocation,
  updateMicrophoneValue,
  onEmojiClick,
  chosenEmoji,
  hideSelector
}) => {
  const [openAction, setOpenAction] = useState(false);
  const videoRef = useRef(null);
  const [savedAudioBlob, setSavedAudioBlob] = useState(null);
  const [openPicker, setopenPicker] = useState(0);
  const [chatinput, setChatInput] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [FullRecordedBlob, setFullRecordedBlob] = useState(null);

  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onStart = () => {
    setIsRecording(true);
    setAudio(null); // Reset audio when starting a new recording
  };

  const onStop = (recordedBlob) => {
    setInputValue("Audio");
    setIsRecording(false);
    setRecordedBlob(recordedBlob.blob);
    setFullRecordedBlob(recordedBlob);
    setTogetblob(recordedBlob);
  };

  const handlePlayPause = () => {
    if (recordedBlob) {
      if (audio) {
        // If audio is present, toggle play/pause
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        // If audio is not present, create a new Audio element and start playing
        const newAudio = new Audio(URL.createObjectURL(recordedBlob));
        newAudio.play();
        newAudio.addEventListener("ended", () => {
          setIsPlaying(false);
        });
        setAudio(newAudio);
        setIsPlaying(true);
      }
    }
  };

  const handleOpenCamera = async () => {
    // try {
    //   // Request permission to access the camera
    //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //   // Attach the stream to the video element
    //   if (videoRef.current) {
    //     videoRef.current.srcObject = stream;
    //   }
    // } catch (error) {
    //   console.error('Error accessing camera:', error);
    // }
  };

  const handleClose = () => {
    updateMicrophoneValue(0);
  };

  const handleemojonclick = () => {};

  const handleOpenPicker = (value) => {
    setopenPicker(value);
  };

  const handleClick = (event, emojiObject) => {
    onEmojiClick(event, emojiObject, chatinput);
    handleChange(chatinput);
  };

  const handleCombinedChange = (event, emojiObject) => {
    setChatInput(event.target.value);
    handleChange(event, emojiObject);
  };


  console.log(chosenEmoji);
  return (
    <>
      {microphone === 1 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Audio Recorder</h1>
            <CloseIcon onClick={handleClose} />
          </div>

          <div>
            <ReactMic
              record={isRecording}
              className="sound-wave"
              onStop={onStop}
              onStart={onStart}
              strokeColor="#000000"
              backgroundColor="#FF4081"
            />
            <button onClick={() => setIsRecording(!isRecording)}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {recordedBlob && (
              <div>
                <button onClick={handlePlayPause}>
                  {isPlaying ? "Pause" : "Play"} Recorded Audio
                </button>
              </div>
            )}
          </div>
        </>
      ) : null}
   
     {/* <h3>GeeksforGeeks Emoji Picker</h3>
            {chosenEmoji ? (
                <span>
                    Your Emoji:
                    <img
                        style={{ width: "15px" }}
                        src={chosenEmoji}
                    />
                </span>
            ) : (
                <span>No Emoji</span>
            )} */}

  

      <StyledInput
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        onChange={handleCombinedChange}
        value={inputValue}
        onClick={handleClear}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Stack sx={{ width: "max-content" }}>
              
              {
                hideSelector ? (
                  <Stack
                sx={{
                  position: "relative",
                  display: openAction ? "inline-block" : "none",
                }}
              >
                {Actions.map((el) => (
                  <Tooltip
                    placement="right"
                    title={el.title}
                    key={el.title}
                    onClick={() => {
                      if (el.title == "Photo/Video") {
                        handleButtonClick();
                      }
                      if (el.title == "Document") {
                        handleButtonClick();
                      }
                      if (el.title == "Image") {
                        handleOpenCamera();
                      }
                      if (el.title == "Image") {
                        handleOpenCamera();
                      }
                      if (el.title == "ShareLocation") {
                        handleShareLocation();
                      }
                    }}
                  >
                    <Fab
                      sx={{
                        position: "absolute",
                        top: -el.y,
                        backgroundColor: el.color,
                      }}
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                ))}
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={(input) => (fileInputRef.current = input)}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />

                <input
                  type="file"
                  accept=".doc, .docx, .pdf, .txt" // Specify the document file types you want to accept
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleDocsFileChange(e);
                  }}
                />
              </Stack>
                ) : null
              }
             

              <InputAdornment>
                <IconButton onClick={() => setOpenAction((prev) => !prev)}>
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <InputAdornment>
              <div
                style={{
                  marginBottom: "520px",
                  marginLeft: "40px",
                }}
              >
                {openPicker === 1 ? (
                  <Emoji
                    onEmojiClick={handleClick}
                    style={{
                      marginBottom: "110px",
                    }}
                  />
                ) : null}
              </div>

              <IconButton
                onClick={() => {
                  setOpenPicker((prev) => !prev);
                  handleOpenPicker(openPicker == 0 ? 1 : 0);
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

const GeneralApp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);


  const user = useSelector(state => state.app.user);

  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const [location, setLocation] = useState(null);
  const [data, setData] = useState([]);
  const [clickedChatId, setClickedChatId] = useState(null);
  const [Senderid, setSenderid] = useState(null);
  const [userid, setUsername] = useState("");
  const [chatspace, setChatspace] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);

  const [chathistory, setChathistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [chatmasterid, setChatmasterid] = useState("");
  const [joinchatmaster, setJoinchatmaster] = useState("");
  const [startchats, setStartchats] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [dpname, setDpname] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [SelectedImg, setSelectedImg] = useState(null);
  const [Documents, setDocuments] = useState(null);
  const [microphone, setClickmicrophone] = useState(0);
  const [Audio, setAudio] = useState("");
  const [Emojsrc, setEmojSrc] = useState("");
  const [star, setStar] = useState(false);
  const [Togetblob, setTogetblob] = useState("");
  const [openModal, setOpenModal] = useState(0);
  const [openModalImg, setOpenModalImg] = useState(false);
  const [hideSelector, setHideSelector] = useState(true);


  const blobUrl =
    "blob:http://localhost:3000/66646607-2b28-471a-857e-a980ba6fa731";

  const [originalArray, setOriginalArray] = useState([
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Mango",
  ]);

  const scrollbarsRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  const updateMicrophoneValue = (newValue) => {
    setClickmicrophone(newValue);
  };

  const clearInput = () => {
    setInputValue(""); // Clear the input value when needed
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    setAudioChunks((prevChunks) => [...prevChunks, recordedBlob]);
  };

  const onStop = (recordedBlob) => {
    setAudio(recordedBlob);
    setAudioChunks([]);
  };

  const handlePlay = (blobUrl) => {
    const audio = new Audio(blobUrl);
    audio.play();
  };

  const handleEmojiSelect = (emoji) => {};

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData) {
      // Use the retrieved data as needed
      setUsername(authData.user.id);
    }

    



    const fetchData = async () => {
      try {
        var authData = JSON.parse(window.localStorage.getItem("auth"));

        const listdetails = {
          id: authData.user.id,
          receiver_id: clickedChatId,
        };

        const response = await axios.post(`${serverUrl}/chatlist`, listdetails);
        setData(response.data.data.chatlist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const fetchchatmasterId = async () => {
      try {
        const user_ids = {
          user_id: userid,
          receiver_id: clickedChatId,
        };
        const res = await axios.post(
          `${chatserverUrl}/getchatmasterid`,
          user_ids
        );

        setChatmasterid(res.data.data.chatmaster_id[0].chatmaster_id);
        if (res.data) {
          if (res.data.code == 200) {
          } else {
          }
        }
      } catch (err) {}
    };

    fetchchatmasterId();
    console.log(chathistory.length);
    if (scrollbarsRef.current && chathistory.length  < 10) {
      scrollbarsRef.current.scrollToTop();
    }

    if (scrollbarsRef.current && chathistory.length  > 10) {
      scrollbarsRef.current.scrollToBottom();
    }
   
   
    


  }, [chathistory,openModal]);

  const fetchSenderReceiverMsg = async (chat_masterid, s_id) => {
    try {
      const chathistoryids = {
        chatmasterid: chat_masterid,
        sender_id: s_id,
      };

      const response = await axios.post(
        `${serverUrl}/messages`,
        chathistoryids
      );

      setChathistory(response.data.data.history);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onEmojiClick = (event, emojiObject, data) => {

    const newSelectedEmojis = [...selectedEmojis, emojiObject.target.src];
    setSelectedEmojis(newSelectedEmojis);

    setChosenEmoji(emojiObject.target.src);
    setInputValue(`<img src="${emojiObject.target.src}" alt="emoji" />`);
  };

  const onchangeFetchMasterid = async (userids, clickedChatIds) => {
    try {
      const user_ids = {
        user_id: userids,
        receiver_id: clickedChatIds,
      };
      const res = await axios.post(
        `${chatserverUrl}/getchatmasterid`,
        user_ids
      );
      if (res.data) {
        if (res.data.code == 200) {
          setChatmasterid(
            res.data.data.chatmaster_id[0].chatmaster_id.length === 0
              ? ""
              : res.data.data.chatmaster_id[0].chatmaster_id
          );
        } else {
        }
      }
    } catch (err) {
      setChatmasterid("");
    }
  };

  const OnclickfetchSenderReceiverMsg = async (chat_masterid, s_id) => {
    try {
      const chathistoryids = {
        chatmasterid: chat_masterid,
        sender_id: s_id,
      };

      const response = await axios.post(
        `${serverUrl}/messages`,
        chathistoryids
      );
      setChathistory(response.data.data.history);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = {
        message_id: id.id,
        chatmasterid: id.chatmaster_id,
      };

      const res = await axios.post(`${chatserverUrl}/deleteconversemsg`, data);
      if (res.data) {
        if (res.data.code == 200) {
          fetchSenderReceiverMsg(id.chatmaster_id, id.sender_id);
          toast.success(res.data.data.message);
        } else {
          toast.error(res.data.data.message);
        }
      }
    } catch (err) {
      toast.error("Failed. " + err.response.data.data.message);
    }
  };

  const handelmaindelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDelete(id);
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const OnclickfetchJoinMasterid = async (userid, clickedChatId) => {
    try {
      const user_ids = {
        user_id: userid,
        receiver_id: clickedChatId,
      };
      const res = await axios.post(`${chatserverUrl}/joinchatmaster`, user_ids);

      if (res.data) {
        if (res.data.code == 200) {
          setJoinchatmaster(res.data.data.chatmaster_id);
        } else {
          setJoinchatmaster(res.data.data.chatmaster_id);
        }
      }
    } catch (err) {}
  };

  const handleChatClick = (chatmasterid, s_id, r_id, profileimg, name, e) => {
    onchangeFetchMasterid(s_id, r_id);
    OnclickfetchJoinMasterid(s_id, r_id);

    // Set the clicked chat id in the state
    setClickedChatId(r_id);
    setChatspace(true);
    setProfileImg(profileimg);
    setDpname(name);

    // Call otherFunction or any other logic you need
    otherFunction(chatmasterid);
    OnclickfetchSenderReceiverMsg(chatmasterid, s_id);
  };

  const otherFunction = (id) => {
    // Your otherFunction logic here
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setInputValue(
            `https://www.google.com/maps?q=${location.lat},${location.lng}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const { sidebar } = useSelector((store) => store.app); // access our store inside component

  const handleChange = (event, emoj) => {
    setInputValue(event.target.value);
  };

  const handleChatMaster = async() => {
    console.log(chatserverUrl);

   const headerdetails = {
      sender_id:userid,
      receiver_id:clickedChatId
    }
     try {
     

       const res = await axios.post(`${chatserverUrl}/StarChat`,headerdetails);
       console.log(res.data.data.chatmasterid);
       if(res.data){
        console.log(res.data.data);
        fetchSenderReceiverMsg(res.data.data.chatmasterid, userid);
         setJoinchatmaster(1);
       }else{
        console.log(res);
       }
     } catch (error) {
      console.log(error);
     }
  };

  const handleClear = () => {
    
 };


  

  const handleSendmessage = async (event) => {
    event.preventDefault();
    try {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      // Convert 24-hour format to 12-hour format
      const formattedHours = hours % 12 || 12;

      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

      const formData = new FormData();
      formData.append("senderid", userid);
      formData.append("receiverid", clickedChatId);
      formData.append("type", "msg");
      formData.append("message", inputValue);
      formData.append("time", formattedTime);
      formData.append("incoming", false); // Use boolean value instead of string
      formData.append("sender_income", true); // Use boolean value instead of string
      formData.append("subtype", Togetblob.blobURL ? "Audio" : "");
      formData.append("chatmaster_id", chatmasterid);
      formData.append("image", SelectedImg);
      formData.append("audio", Togetblob.blobURL);
      formData.append("reply", "");

      const axiosInstance = axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const res = await axiosInstance.post(
        `${chatserverUrl}/msgconversation`,
        formData
      );

      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
          setSelectedImg("");
          setInputValue("");
          fetchSenderReceiverMsg(chatmasterid, userid);
        } else {
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleModelImage = (event) => {
    console.log(inputValue);
    handleSendmessage(event);
    setOpenModal(0);
    setHideSelector(true);
 }




  const handleFileChange = (e) => {
    // Handle the selected file
    const selectedFile = e.target.files[0];
    setSelectedImg(selectedFile);
    setOpenModalImg(selectedFile);
    setOpenModal(1); 
    fileInputRef.current.value = null;
    setHideSelector(false);
  };

  const handelModelClose = () => {
    setOpenModal(0);
    setHideSelector(true);
  }
  const handleDocsFileChange = (e) => {
    const selectedDocsFile = e.target.files[0];
    if (selectedDocsFile) {
      // Check if the selected file is a document
      if (
        selectedDocsFile.type.startsWith("application/") ||
        selectedDocsFile.type === "text/plain"
      ) {
        console.log("Selected document:", selectedDocsFile);
        // Do something with the selected document
      } else {
        alert("Please select a valid document file.");
      }
    }
  };
  const handleButtonClick = () => {
    // Trigger the click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.value = null;
    }
  };

  const handleDocsButtonClick = () => {
    // Trigger the click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.value = null;
    }
  };

  const handlemicrophone = () => {
    setClickmicrophone(1);
  };

  const getemoj = async (emoji, messagedata) => {
    try {
      const id = messagedata.id;
      const sender_id = messagedata.sender_id;
      const receiver_id = messagedata.receiver_id;
      const time = messagedata.time;
      const message = messagedata.message;

      const formData = {
        id: id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        time: time,
        message: message,
        emoji: emoji.imageUrl,
      };

      const res = await axios.post(`${chatserverUrl}/reaction`, formData);

      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
      
          setSelectedImg("");
          setInputValue("");
          fetchSenderReceiverMsg(chatmasterid, userid);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ReplyMsgs = async (e, data) => {
    e.preventDefault();
    try {
      const axiosInstance = axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      // Convert 24-hour format to 12-hour format
      const formattedHours = hours % 12 || 12;

      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

      const formData = new FormData();
      formData.append("senderid", userid);
      formData.append("receiverid", clickedChatId);
      formData.append("type", "msg");
      formData.append("message", data.message);
      formData.append("time", formattedTime);
      formData.append("incoming", false); // Use boolean value instead of string
      formData.append("sender_income", true); // Use boolean value instead of string
      formData.append("subtype", "reply");
      formData.append("chatmaster_id", chatmasterid);
      formData.append("image", SelectedImg);
      formData.append("audio", Audio);
      formData.append("reply", inputValue);
      const res = await axiosInstance.post(
        `${chatserverUrl}/msgconversation`,
        formData
      );

      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
          setSelectedImg("");
          setInputValue("");
          fetchSenderReceiverMsg(chatmasterid, userid);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClicks = (emoji) => {};

  const handlestar = async(e,messagedata) => {
    e.preventDefault();
    try {
      const id = messagedata.id;
      const sender_id = messagedata.sender_id;
      const receiver_id = messagedata.receiver_id;
      const time = messagedata.time;
      const message = messagedata.message;

      const formData = {
        id: id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        time: time,
        message: message,
        emoji: '',
        star:1
      };

      const res = await axios.post(`${chatserverUrl}/reaction`, formData);

      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
     
          setSelectedImg("");
          setInputValue("");
          fetchSenderReceiverMsg(chatmasterid, userid);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleUnstar = async(e,messagedata) => {
    e.preventDefault();
    try {
      const id = messagedata.id;
      const sender_id = messagedata.sender_id;
      const receiver_id = messagedata.receiver_id;
      const time = messagedata.time;
      const message = messagedata.message;

      const formData = {
        id: id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        time: time,
        message: message,
        emoji: '',
        star:0
      };

      const res = await axios.post(`${chatserverUrl}/reaction`, formData);

      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
          setSelectedImg("");
          setInputValue("");
          fetchSenderReceiverMsg(chatmasterid, userid);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedEmojis);





  return (
    
    <Stack direction="row" sx={{ width: "100%" }}>
      {/* Chats */}
      {/* Render the modal based on the state */}
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton>
              <CircleDashed />
            </IconButton>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>

          <Stack
            className="scrollbar"
            spacing={2}
            direction="column"
            sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          >
            <Stack spacing={2.4}>
              {data
                .filter((el) => !el.pinned)
                .map((el) => (
                  <ChatElement
                    key={el.id}
                    {...el}
                    onClick={(e) =>
                      handleChatClick(
                        chatmasterid,
                        userid,
                        el.id,
                        el.img,
                        el.name,
                        e
                      )
                    }
                  />
                ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}
      >
        {chatspace ? (
          <>
            {joinchatmaster === 1 ? (
              <>
                {/* <Conversation/> */}
                <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
                  {/* Chat header */}
                  <Header
                    profilepic={profileImg}
                    name={dpname}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                  />
                  {/* Msg */}
                  <Scrollbars



                    ref={scrollbarsRef}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMax="100%"
                    style={{ width: "100%",
                    height: "100vh",
                    backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/01/99/79/88/1000_F_199798806_PAFfWGapie6Mk8igqKHbhIIa9LwQcvQr.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed', 
                   
                     }}
                    renderThumbVertical={({ style, ...props }) => (
                      <div
                        {...props}
                        style={{
                          ...style,
                          backgroundColor: "#888",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  >
                   <div>
                   <Message
                      menu={true}
                      senderid={userid}
                      receiverid={clickedChatId}
                      chathistory={chathistory}
                      handelmaindelete={handelmaindelete}
                      ReplyMsgs={ReplyMsgs}
                      onEmojiClicks={onEmojiClicks}
                      getemoj={getemoj}
                      closeEmoji={false}
                      handlestar={handlestar}
                      star={star}
                      setStar={setStar}
                      searchTerm={searchTerm}
                      handleUnstar={handleUnstar}
                      openModal={openModal}
                      openModalImg={openModalImg}
                      handelModelClose={handelModelClose}
                      handleModelImage={handleModelImage}
                      setInputValue={setInputValue}
                    />
                   </div>
                  </Scrollbars>
                  {/* Chat footer */}
                  {/* <Footer senderid={userid} receiverid={clickedChatId}/> */}

                  <Box
                    p={2}
                    sx={{
                      width: "100%",
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "#F8FAFF"
                          : theme.palette.background.paper,
                      boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
                    }}
                  >
                    <Stack direction="row" alignItems={"center"} spacing={3}>
                      <Stack sx={{ width: "100%" }}>
                        {/* Chat Input */}
                        <Box
                          sx={{
                            display: openPicker ? "inline" : "none",
                            zIndex: 10,
                            position: "fixed",
                            bottom: 81,
                            right: 100,
                          }}
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                          {/* <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log}/> */}
                        </Box>
                      
 {/* <div style={{ display: "flex" }}>
        {selectedEmojis.map((emoji, index) => (
          <img key={index} src={emoji} alt="selected-emoji" style={{ width: "30px", height: "30px", marginRight: "5px" }} />
        ))}
      </div> */}


                        <ChatInput
                          setOpenPicker={setOpenPicker}
                          handleChange={handleChange}
                          handleClear={handleClear}
                          fileInputRef={fileInputRef}
                          handleFileChange={handleFileChange}
                          handleButtonClick={handleButtonClick}
                          handleDocsFileChange={handleDocsFileChange}
                          handleDocsButtonClick={handleDocsButtonClick}
                          isRecording={isRecording}
                          onStop={onStop}
                          onData={onData}
                          startRecording={startRecording}
                          stopRecording={stopRecording}
                          microphone={microphone}
                          updateMicrophoneValue={updateMicrophoneValue}
                          clearInput={clearInput}
                          handleShareLocation={handleShareLocation}
                          handleEmojiSelect={handleEmojiSelect}
                          onEmojiClick={onEmojiClick}
                          chosenEmoji={chosenEmoji}
                          setTogetblob={setTogetblob}
                          setInputValue={setInputValue}
                          hideSelector={hideSelector}
                          
                        />
                      </Stack>
                      <div></div>

                      <Box
                        sx={{
                          height: 48,
                          width: 48,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: 1.5,
                        }}
                      >
                        <Stack
                          sx={{
                            height: "100%",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton>
                            {inputValue.length === 0 ? (
                              Audio ? (
                                <PaperPlaneTilt
                                  color="#fff"
                                  onClick={handleSendmessage}
                                />
                              ) : (
                                <Microphone
                                  color="#fff"
                                  onClick={handlemicrophone}
                                />
                              )
                            ) : (
                              <PaperPlaneTilt
                                color="#fff"
                                onClick={handleSendmessage}
                              />
                            )}
                          </IconButton>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </>
            ) : (
              <>
                <StartChat onClick={handleChatMaster} />
              </>
            )}
          </>
        ) : (
          <div>Welcome page</div>
        )}
      </Box>
    </Stack>
  );
};

export default GeneralApp;
