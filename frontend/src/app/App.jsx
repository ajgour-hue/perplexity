import React, { useEffect } from 'react'
import { router } from './app.routes';
import { RouterProvider } from 'react-router-dom';
import { useAuth } from '../features/auth/hook/useAuth';

const App = () => {
  const auth = useAuth()

  useEffect(() => {
    auth.handleGetMe()
  }, [auth])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
