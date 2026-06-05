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
    chat.initializeSocketConnection()
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

  return (
    <main className='min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5'>
      <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl p-1 md:h-[calc(100vh-2.5rem)] md:gap-6'>
        
        {/* Sidebar */}
        <aside className='hidden h-full w-72 shrink-0 rounded-3xl bg-[#080b12] p-4 md:flex md:flex-col border border-white/10'>
          <h1 className='mb-5 text-3xl font-semibold tracking-tight'>
            Perplexity
          </h1>

          <div className='space-y-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <button
                key={index}
                type='button'
                className='w-full rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white'
              >
                Chat title
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Section */}
        <section className='relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4'>
          
          {/* Messages */}
          <div className='messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30'>
            {currentChatId ? (
              chats[currentChatId]?.messages?.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
                    message.role === 'user'
                      ? 'ml-auto rounded-br-none bg-white/12 text-white'
                      : 'mr-auto border border-white/25 bg-[#0f1626] text-white/90'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              ))
            ) : (
              <div className='flex h-full items-center justify-center text-white/40'>
                Start a conversation...
              </div>
            )}
          </div>

          {/* Input */}
          <footer className='absolute bottom-2 w-full rounded-3xl border border-white/60 bg-[#080b12] p-4 md:p-5'>
            <form
              onSubmit={handleSubmitMessage}
              className='flex flex-col gap-3 md:flex-row'
            >
              <input
                type='text'
                value={chatInput}
                onChange={(event) =>
                  setChatInput(event.target.value)
                }
                placeholder='Type your message...'
                className='w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90'
              />

              <button
                type='submit'
                disabled={!chatInput.trim()}
                className='rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard