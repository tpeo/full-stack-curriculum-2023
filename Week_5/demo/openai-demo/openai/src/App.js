import {Divider, Fab, Grid, List, TextField, Alert, CircularProgress} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import MessageComponent from './MessageComponent';
import './App.css';

function App() {
  const API_KEY = ""

  const systemMessage = {
    //  Explain things like you're talking to a software professional with 5 years of experience.
    role: "system",
    content:
      "Explain things like you're talking to a software professional with 2 years of experience.",
  };

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sender: "ChatGPT"
    }])
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    const newMessage = {
      message: input,
      direction: "outgoing",
      sender: "user"
    }

    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setInput("")

    await processMessageToChatGPT(newMessages)

  }

  async function processMessageToChatGPT(chatMessages) {
    setLoading(true)
    let apiMessages = chatMessages.map((message) => {
      let role = ""
      if (message.sender === "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }

      return { role: role, content: message.message}
    })

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      })
        .then((data) => {
          return data.json()
        })
        .then((data) => {
          setMessages([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT",
            },
          ])
          setLoading(false)
        })
    } catch (error) {
    // do something
    setLoading(false)
    setError(true)
  }
}

  return (
    <Grid item xs={9}>
        <List>
          {
            messages.map((message, index) => {
              return (
                <MessageComponent
                  number={index}
                  message={message.message}
                  responder={message.sender}
              />)
            })
          }
        </List>
        <Divider />
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={11}>
             <TextField
              id="outlined-basic-email"
              label="Type Something"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              fullWidth
            />
          </Grid>

          <Grid item xs={1} align="right">
            <Fab color="primary" aria-label="add">
              {loading ? (
                <CircularProgress color="inherit"/>
              ) : (
                <SendIcon onClick={handleSend} />
              )}
            </Fab>
          </Grid>

          <Grid item xs={11}>
          {error && (<Alert severity="error">Error: {error.message}</Alert>)}
          </Grid>
        </Grid>
      </Grid>
  );
}

export default App;
