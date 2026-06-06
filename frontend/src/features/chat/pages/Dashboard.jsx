import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
  const chat = useChat()

  const [chatInput, setChatInput] = useState('')

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector(
    (state) => state.chat.currentChatId
  )

  useEffect(() => {
    chat.initializeSocketConnection(),

    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = async (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()

    if (!trimmedMessage) return

    await chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
    })

    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId)
  }

  // return (
  //   <main className='min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5'>
  //     <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl p-1 md:h-[calc(100vh-2.5rem)] md:gap-6'>
        
  //       {/* Sidebar */}
  //       <aside className='hidden h-full w-72 shrink-0 rounded-3xl bg-[#080b12] p-4 md:flex md:flex-col border border-white/10'>
  //         <h1 className='mb-5 text-3xl font-semibold tracking-tight'>
  //           Perplexity
  //         </h1>

  //       <div className='space-y-2 overflow-y-auto '   style={{
  //   scrollbarWidth: 'none',
  //   msOverflowStyle: 'none',
  // }}>
  //           {Object.values(chats).map((chat, index) => (
  //             <button 
  //             onClick={() => openChat(chat.id)}
  //               key={index}
  //               type='button'
  //               className='w-full rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white'
  //             >
  //               {chat.title}
  //             </button>
  //           ))}
  //         </div>
  //       </aside>

  //       {/* Chat Section */}
  //       <section className='relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4' >
          
  //         {/* Messages */}
  //         <div className='messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30'  style={{
  //   scrollbarWidth: 'none',
  //   msOverflowStyle: 'none',
  // }}>
  //           {currentChatId ? (
  //             chats[currentChatId]?.messages?.map((message, index) => (
  //               <div
  //                 key={index}
  //                 className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
  //                   message.role === 'user'
  //                     ? 'ml-auto rounded-br-none bg-white/12 text-white'
  //                     : 'mr-auto border border-white/25 bg-[#0f1626] text-white/90'
  //                 }`}
  //               >
  //                 <p>{message.content}</p>
  //               </div>
  //             ))
  //           ) : (
  //             <div className='flex h-full items-center justify-center text-white/40'>
  //               Start a conversation...
  //             </div>
  //           )}
  //         </div>

  //         {/* Input */}
  //         <footer className='absolute bottom-2 w-full rounded-3xl border border-white/60 bg-[#080b12] p-4 md:p-5'>
  //           <form
  //             onSubmit={handleSubmitMessage}
  //             className='flex flex-col gap-3 md:flex-row'
  //           >
  //             <input
  //               type='text'
  //               value={chatInput}
  //               onChange={(event) =>
  //                 setChatInput(event.target.value)
  //               }
  //               placeholder='Type your message...'
  //               className='w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90'
  //             />

  //             <button
  //               type='submit'
  //               disabled={!chatInput.trim()}
  //               className='rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
  //             >
  //               Send
  //             </button>
  //           </form>
  //         </footer>
  //       </section>
  //     </section>
  //   </main>
  // )

  return (
  <div className="flex min-h-screen bg-[#050505] text-zinc-100 overflow-hidden">
    
    {/* Sidebar */}
    <aside className="hidden md:flex md:w-64 flex-col border-r border-white/10 bg-[#080b12]">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <h1 className="text-xl font-semibold tracking-tight">
          Perplexity
        </h1>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {Object.values(chats).map((chat, index) => (
          <button
            key={index}
            onClick={() => openChat(chat.id)}
            className={`w-full rounded-xl px-4 py-3 text-left transition-all ${
              currentChatId === chat.id
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-zinc-400"
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </aside>

    {/* Main Area */}
    <div className="flex flex-1 flex-col h-screen overflow-hidden">

      {/* Header */}
      <header className="h-16 shrink-0 border-b border-white/5 flex items-center px-6">
        <h2 className="text-lg font-medium text-zinc-300">
          {chats[currentChatId]?.title || "New Chat"}
        </h2>
      </header>

      {/* Chat */}
      <div className="flex-1 overflow-hidden flex flex-col">

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 md:px-10 py-6 space-y-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {currentChatId ? (
            chats[currentChatId]?.messages?.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl rounded-3xl px-5 py-4 text-sm md:text-base leading-relaxed ${
                    message.role === "user"
                      ? "bg-[#1c1c1c] text-white"
                      : "bg-[#0d1117] border-none text-zinc-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-semibold mb-3">
                  How can I help you?
                </h2>
                <p className="text-zinc-500">
                  Start a new conversation
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="shrink-0 px-4 md:px-8 pb-5">
          <form
            onSubmit={handleSubmitMessage}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#0b0b0b] px-4 py-3 shadow-lg">
              <input
                type="text"
                value={chatInput}
                onChange={(e) =>
                  setChatInput(e.target.value)
                }
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
              />

              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="rounded-2xl bg-white text-black px-5 py-2 font-medium transition hover:opacity-90 disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)
}

export default Dashboard