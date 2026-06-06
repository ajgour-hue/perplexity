import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js"
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage  ,addMessages } from "../chat.slice.js";
import { useDispatch } from "react-redux";

export const useChat = () => {

    const dispatch = useDispatch();

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))

        try {
            const data = await sendMessage({ message, chatId })

            const { chatId: newChatId, title, aiMessage } = data

           if(!chatId) {
             dispatch(createNewChat({
                chatId: newChatId,
                title,
            }))

           }


            dispatch(addNewMessage({
                chatId: newChatId || chatId,
                content: message,
                role: "user",
            }))

            dispatch(addNewMessage({
                chatId: newChatId || chatId,
                content: aiMessage.content,
                role: aiMessage.role,
            }))

            dispatch(setCurrentChatId(newChatId))
        } catch (error) {
            console.error(error)
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: chat.messages,
                lastUpdated: chat.updatedAt,
            }
            return acc

        }, {})))
        dispatch(setLoading(false))
    }

  async function handleOpenChat(chatId) {
    
    const data = await getMessages(chatId)
    const { messages } = data

    const formattedMessages = messages.map(message => ({
        content: message.content,
        role: message.role,
    }))

    dispatch(addMessages({
        chatId,
        messages: formattedMessages,
    }))
        dispatch(setCurrentChatId(chatId))

  }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
    }

}

export default useChat
