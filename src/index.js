import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import App from './App'
import TopNav from './TopNav'

const root = createRoot(document.querySelector('#root'))
root.render(
  <>
    <TopNav />
    <App />
  </>
)
