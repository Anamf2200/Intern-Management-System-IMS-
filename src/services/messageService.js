
const Message= require("../models/chatMessage")

async function saveMessages(data){
    return await Message.create(data)

}

async function getMessages(chatId){
    return await Message.find({chatId}).sort({createdAt:1})
}

module.exports={saveMessages,getMessages}