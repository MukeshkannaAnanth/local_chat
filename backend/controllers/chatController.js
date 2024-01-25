const db = require("../database/db");
const httpstatus = require("../util/httpstatus");
const mime = require('mime-types');
const moment = require('moment');
const extension = mime.extension('application/pdf');
// console.log(extension);

const getMsgSenderReceiver = async (req, res) => {
  const { senderid, receiverid } = req.body;

  try {
    const messages = await db("message")
      .select("*")
      .where({
        sender_id: senderid,
        receiver_id: receiverid,
      })
      .orderBy("id", "desc");
    var json = httpstatus.successRespone({
      message: "Two User indidual messages",
      conversation: messages,
    });
    return res.send(json);
  } catch (error) {
    return res.send(httpstatus.errorRespone({ message: error.message }));
  }
};

const storeMessage = async (req, res) => {

  console.log(req.file);
  const {
    message,
    chatmaster_id,
    incoming,
    outgoing,
    type,
    senderid,
    receiverid,
    time,
    image,
    subtype,
    reply,
    audio
  } = req.body;

  try {
    const msg_sender = await db.raw(
      `SELECT sender_income,receiver_income FROM chatmaster WHERE sender_id=${senderid}`
    );

    const data = msg_sender;
  console.log(`check chat master`,msg_sender[0].receiver_income);
    if (senderid==5) {
      var income = "true";
      var outcome = "false";
    } else {
      var income = "false";
      var outcome = "true";
    }

    var docsimg = req.file ? "img" : "";

    if(req.file){
      const filenamedocs = req.file.filename;
      // Check if the filename indicates an image
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      const isImage = imageExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));
      
      // Check if the filenamedocs indicates a document
      const documentExtensions = ['pdf', 'doc', 'docx', 'txt'];
      const isDocument = documentExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));
      
      // Check if the filenamedocs indicates an audio file
  const audioExtensions = ['mp3', 'wav', 'ogg', 'aac'];
  const isAudio = audioExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));

  const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
const isVideo = videoExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));

    
      if (isImage) {
       var docsimg = 'img';
      } 
     
      else if (isDocument) {
        // It's a document
        var docsimg = 'doc';
      } 
      else if (isAudio) {
        // It's an audio file
        var docsimg = 'audio';
      }
      else if (isVideo) {
        docsimg = 'video';
      }
     
      else {
        // It's neither an image nor a document
        var docsimg = '';
      }
    }
   
    
 


    const chatmessage = {
      sender_id: senderid,
      receiver_id: receiverid,
      type: type,
      message: audio && audio===undefined ? 'audio' : message,
      time: time,
      incoming: income,
      outgoing: outcome,
      subtype: subtype=='reply' || subtype==='Audio' ? subtype : (docsimg || ''),
      chatmaster_id: chatmaster_id,
      img: req.file ? req.file.filename : '',
      unread:'',
      reply:reply,
      blob_url: audio ? audio : '',
      incoming1 : income=== 'true' ? 'false' : 'true',
      outgoing1 : outcome=== 'true' ? 'false' : 'true',
    };
    
    function isGoogleMapsLink(input) {
      // Regular expression to match a Google Maps link
      const googleMapsRegex = /^https:\/\/www\.google\.com\/maps\//;
    
      // Check if the input string matches the Google Maps link pattern
      return googleMapsRegex.test(input);
    }
    

 

    const results = await db("message")
      .select("id", "type", "message", "chatmaster_id", "subtype", "img", 'reply','time')
      .select(db.raw("incoming as incoming_boolean"))
      .select(db.raw("outgoing as outgoing_boolean"))
      .where("chatmaster_id", chatmaster_id);

    // Transform the results to convert string values to boolean
    const messages = results.map((message) => ({
      id: message.id,
      type: message.type,
      subtype: message.subtype,
      img: message.img,
      message: message.message,
      reply: message.reply === null ? '' : message.reply,
      time: message.time,
      chatmaster_id: message.chatmaster_id,
      incoming: message.incoming_boolean === "true" ? 1 : 0, // Convert to boolean
      outgoing: message.outgoing_boolean === "true" ? 1 : 0, // Convert to boolean
    }));

    db("message")
      .insert(chatmessage)
      .then((data) => {
        console.log("chat inserted successfully");
        console.log(data);
        var json = httpstatus.successRespone({
          message: "chat inserted successfully",
          chatMessage: chatmessage,
          sendAfterConversation: messages,
        });
        return res.send(json);
      })

      .catch((err) => {
        res.send(httpstatus.errorRespone({ message: err.message }));
      });
  } catch (err) {
    res.send(httpstatus.errorRespone({ message: err.message }));
  }
};


const reactionUpdate = async (req,res) => {
  try {
    const { sender_id,receiver_id,id,time,message,emoji,star } = req.body;
    console.log(req.body);

    if(emoji.length > 0){
      var updatedata = {
        reaction: emoji,
      }
    }else{
      var updatedata = {
        star: star,
      }
    }


    db('message')
  .where({
    id: id,
    sender_id: sender_id,
    receiver_id: receiver_id,
    time: time,
    message: message,
  })
  .update(updatedata)
  .then((updatedRows) => {
    console.log('Number of rows updated:', updatedRows);

    if (updatedRows > 0) {

      var json = httpstatus.successRespone({
        message: 'Emoji Updated',
      });
      return res.send(json);
    } else {
      res.send(httpstatus.errorRespone({ message: err.message,emoji:emoji }));
    }
  })
  .catch((err) => {
    console.error('Error updating data:', err);
    res.send(httpstatus.errorRespone({ message: err.message,emoji:emoji }));
  })
  .finally(() => {
    // Do not destroy the connection immediately if your application continues to make queries
    // db.destroy();
  });


  } catch (err) {
    res.send(httpstatus.errorRespone({ message: err.message,emoji:emoji }));

  }
}




const getchatMaster_id = async (req, res) => {
  try {
    const { user_id, receiver_id } = req.body;

    try {
      // const results = await db('chatmaster').select('chatmaster_id').where({ sender_id: user_id,receiver_id:receiver_id });
      const results = await db("chatmaster")
        .select("chatmaster_id")
        .where(function () {
          this.where({ sender_id: user_id, receiver_id: receiver_id }).orWhere({
            sender_id: receiver_id,
            receiver_id: user_id,
          });
        });
      //console.log(results);
      var json = httpstatus.successRespone({
        message: "get chat master id",
        chatmaster_id: results,
      });
      return res.send(json);
    } catch (err) {
      res.send(httpstatus.errorRespone({ message: err.message }));
    }
  } catch (err) {
    res.send(httpstatus.errorRespone({ message: err.message }));
  }
};

const joinChatMaster = async (req, res) => {
  try {
    const { user_id, receiver_id } = req.body;

    try {
      // const results = await db('chatmaster').select('chatmaster_id').where({ sender_id: user_id, receiver_id: receiver_id });

      const results = await db("chatmaster")
        .select("chatmaster_id")
        .where(function () {
          this.where({ sender_id: user_id, receiver_id: receiver_id }).orWhere({
            sender_id: receiver_id,
            receiver_id: user_id,
          });
        });
      // Check the length of the results array
      const resultsLength = results.length;

      if (resultsLength === 0) {
        // No records found
        var json = httpstatus.successRespone({
          message: "No chat master id found for the given criteria",
          chatmaster_id: 0,
          userid: user_id,
          r_id: receiver_id,
        });
        return res.send(json);
      } else {
        // Records found
        var json = httpstatus.successRespone({
          message: "Chat master id found",
          chatmaster_id: 1,
          userid: user_id,
          r_id: receiver_id,
        });
        return res.send(json);
      }
    } catch (err) {
      // Error in query execution
      res.send(httpstatus.errorRespone({ message: err.message }));
    }
  } catch (err) {
    // Error in request body parsing
    res.send(httpstatus.errorRespone({ message: err.message }));
  }
};

const deleteCnvMsg = async(req,res) => {
  const { message_id,chatmasterid } = req.body;
  try {
  const deleteMsg = await db('message')
    .del().where('id', '=', message_id);

  

    const results = await db('message')
    .select('id', 'type', 'message', 'chatmaster_id', 'sender_id', 'receiver_id', 'subtype', 'img', 'reply')
    .select(db.raw('incoming as incoming_boolean'))
    .select(db.raw('outgoing as outgoing_boolean'))
    .where({ chatmaster_id:chatmasterid  });
    

    var messages = results.map((message) => ({
    id: message.id,
    sender_id: message.sender_id,
    receiver_id: message.receiver_id,
    type: message.type,
    subtype: message.subtype,
    img: message.img,
    message: message.message,
    reply: message.reply === null ? '' : message.reply,
    chatmaster_id: message.chatmaster_id,
    incoming: message.incoming_boolean === 'true' ? 1 : 0, // Convert to boolean
    outgoing: message.outgoing_boolean === 'true' ? 1 : 0, // Convert to boolean
    }));




    var json = httpstatus.successRespone({
      message: "Delete Data Successfully",
      message_id: message_id,
      chathistory:messages

    });
    return res.send(json);

  } catch (err) {
    res.send(httpstatus.errorRespone({ message: err.message }));

  }
}


const TimeLine = async(req,res) => {
  const { chatmaster_id  } = req.body;
  try {
    const messageCounts = await db('message')
  .select(db.raw('FORMAT(date_added, \'yyyy-MM-dd\') as date_added'))
  .count('id as message_count')
  .groupBy('date_added');

     var json = httpstatus.successRespone({
      message: "Time line",
      message: messageCounts,
      

    });
    return res.send(json);
  } catch (err) {
     res.send(httpstatus.errorRespone({ message: err.message }));
  }
}


const createChatMasterId = async () => {
  try {
    const maxChatmasterId = await db('chatmaster')
      .max('chatmaster_id as maxChatmasterId')
      .first();

    // // Determine the new chatmaster_id (incremented by one)
    // const incrementedValue = maxChatmasterId.maxChatmasterId !== null
    //   ? maxChatmasterId.maxChatmasterId
    //   : 1;

    // Format the incremented value as 'CHAT' followed by numeric part with leading zeros
    const numericPartMatch = maxChatmasterId.maxChatmasterId.match(/\d+$/);
    const numericPart = numericPartMatch ? numericPartMatch[0] : null;
// Increment the numeric part by 1
const incrementedNumericPart = numericPart !== null
  ? parseInt(numericPart, 10) + 1
  : 1;

// Pad the incremented numeric part with leading zeros
const paddedNumericPart = `CHAT${String(incrementedNumericPart).padStart(numericPart.length, '0')}`;

    return paddedNumericPart;
  } catch (error) {
    console.error('Error creating new chatmaster:', error.message);
    throw error;
  }
};

// Example usage
createChatMasterId()
  .then(result => {
    console.log(result); // Output: CHAT00002 (or the next available number)
  })
  .catch(error => {
    console.error('Error:', error.message);
  });


const cheackChatMaster = async(req,res) => {

  const { sender_id,receiver_id } = req.body;
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
  
  const formattedTime = moment(currentDate).format('hh:mm A');
    
  const chatid = await createChatMasterId();
  
  try {
    const chatmasterData = {
      sender_id: sender_id,
      receiver_id: receiver_id,
      sender_income: sender_id,
      receiver_income: receiver_id,
      updated_at: formattedDate,
      created_at: formattedDate,
      chatmaster_id: chatid
    };
  
    // First insert operation
    const chatmasterInsertResult = await db("chatmaster").insert(chatmasterData);
    console.log("ChatMaster inserted successfully");
    console.log(chatmasterInsertResult);
  
    const msg_sender = await db.raw(
      `SELECT sender_income FROM chatmaster WHERE sender_id=${sender_id}`
    );
  
    const data = msg_sender;
    // Logic based on msg_sender result
    const income = data && data.length > 0 ? "true" : "false";
    const outcome = data && data.length > 0 ? "false" : "true";
  
    const chatmessage = {
      sender_id: sender_id,
      receiver_id: receiver_id,
      type: 'msg',
      message: 'Hi',
      time: formattedTime,
      incoming: income,
      outgoing: outcome,
      subtype: '',
      chatmaster_id: chatid,
      img: '',
      unread: '',
      reply: '',
      blob_url: '',
      incoming1: income === 'true' ? 'false' : 'true',
      outgoing1: outcome === 'true' ? 'false' : 'true',
    };
  
    // Second insert operation
    const chatmessageInsertResult = await db("message").insert(chatmessage);
    console.log("Chat inserted successfully");
    console.log(chatmessageInsertResult);
  
    // Send success response
    const json = httpstatus.successRespone({
      message: "Chats inserted successfully",
      chatmasterData: chatmasterInsertResult,
      chatMessage: chatmessageInsertResult,
      sendAfterConversation: chatmessage,
      chatmasterid:chatid
    });
    return res.send(json);
  } catch (error) {
    console.error('Error:', error.message);
    res.send(httpstatus.errorRespone({ message: error.message }));
  }
  






}





module.exports = {
  getMsgSenderReceiver,
  storeMessage,
  getchatMaster_id,
  joinChatMaster,
  deleteCnvMsg,
  reactionUpdate,
  TimeLine,
  cheackChatMaster,
  cheackChatMaster
};
