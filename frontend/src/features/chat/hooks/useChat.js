import { initializeSocketConnection } from "../service/chat.socket";
import {sendMessage , getChats ,getMessages ,deleteChat  } from "../service/chat.api.js"
import { setChats, setCurrentChatId, setError ,setLoading ,createNewChat ,addNewMessage  } from "../chat.slice.js";
import { useDispatch } from "react-redux";

 export const useChat = () => {
   
    const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true))

    try {
        const data = await sendMessage({ message, chatId })

        const { chatId: newChatId, title, aiMessage } = data

        dispatch(createNewChat({
            chatId: newChatId,
            title,
        }))

        dispatch(addNewMessage({
            chatId: newChatId,
            content: message,
            role: "user",
        }))

        dispatch(addNewMessage({
            chatId: newChatId,
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


    return {
         initializeSocketConnection,
         handleSendMessage, 
    }

}   

export default useChat
