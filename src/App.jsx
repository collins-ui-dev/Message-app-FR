import { useState } from 'react'
import axios from 'axios'

// Read the backend URL from an environment variable so the same
// code works locally and when deployed (no hardcoded URLs).
const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [messageInput, setMessageInput] = useState('')
  const [response, setResponse] = useState('')

  const handleSendMessage = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/message`, {
        message: messageInput,
      })
      setResponse(res.data.message)
    } catch (error) {
      setResponse('Error: could not reach backend.')
    }
  }

  const handleCheckBackend = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/health`)
      setResponse(res.data.status)
    } catch (error) {
      setResponse('Error: could not reach backend.')
    }
  }

  return (
    <div className="container">
      <h1>Simple Message App</h1>

      <input
        type="text"
        placeholder="Enter message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />

      <div className="button-row">
        <button onClick={handleSendMessage}>Send Message</button>
        <button onClick={handleCheckBackend}>Check Backend</button>
      </div>

      {response && (
        <div className="response">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}

export default App
