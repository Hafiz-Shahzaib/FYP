import axios from "axios"
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";
import openai from './../config/openai.js';
import imagekit from './../config/imagekit.js';


export const textMessageController = async (req, res) => {
  try {
    const userId = req.userId
    const { chatId, prompt } = req.body

    // console.log("REQ BODY:", req.body);

    //  Validate input
    if (!chatId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "chatId and prompt are required"
      })
    }

    const chat = await Chat.findOne({ userId, _id: chatId })

    //  Check chat exists
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found"
      })
    }

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false
    })

    const { choices } = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false
    }

    res.json({ success: true, reply })

    chat.messages.push(reply)
    await chat.save()

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ success: false, message: error.message })
  }
}



export const imageMessageController = async (req, res) => {
  try {
    const userId = req.userId
    const { prompt, chatId, isPublished } = req.body

    const chat = await Chat.findOne({ userId, _id: chatId })

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found"
      })
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false
    })

    // ✅ Generate image (FREE)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`

    // ✅ Upload to ImageKit (optional)
    const uploadResponse = await imagekit.upload({
      file: imageUrl,
      fileName: `${Date.now()}.png`,
      folder: "quickgpt"
    })

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished
    }

    res.json({ success: true, reply })

    chat.messages.push(reply)
    await chat.save()

  } catch (error) {
    console.log("IMAGE ERROR:", error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}