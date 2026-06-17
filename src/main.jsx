import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import ProductProvider from './context/Product.context.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './context/User.context.jsx'
import PostProvider from './context/Post.context.jsx'
// import PostidProvider from './context/Postbyid.context.jsx'

createRoot(document.getElementById('root')).render(
  <PostProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </UserProvider>
  </PostProvider>
)
