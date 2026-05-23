const {saveMessages}= require ("../services/messageService")

module.exports=(io)=>{
    io.on("connection",(socket)=>{
            console.log("User connected:", socket.id);
socket.on("join-room",(chatId)=>{
    socket.join(chatId)
    console.log(`Joined room: ${chatId}`);

})

socket.on("send-message",async(data)=>{
   const {senderId,chatId,message}=data
  const saveMessage= await saveMessages({
    senderId,
    chatId,
    message
})
  io.to(data.chatId).emit("receive-message",saveMessage)

})
socket.on("disconnect",()=>{
 console.log("User disconnected");

})

    })
}

