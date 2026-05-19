import chatModel from "../models/chat.model.js";
import { generateResponse, generateTitle } from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
export async function sendMessage(req, res) {

    const { message } = req.body;

    const result = await generateResponse(message);

    const title = await generateTitle(message);

    // create a chat and save the message in the database
    const chat = await chatModel.create({
        user: req.user.id,
        title,
    })


    //  create a message for the user
    const aimessage = await messageModel.create({
        chat: chat._id,
        content: result,
        role: "ai"
    })

    res.status(201).json({
        title,
        chat,
        aimessage,
    });
} 