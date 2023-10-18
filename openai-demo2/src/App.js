import "./App.css";
import {
  Grid,
  List,
  Divider,
  TextField,
  Fab,
  Alert
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import MessageComponent from "./MessageComponent";

export default function App() {
  const API_KEY = ""

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const systemMessage = {
    //  Explain things like you're talking to a software professional with 5 years of experience.
    role: "system",
    content:
      "Explain things like you're talking to a software professional with 2 years of experience.",
  };
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async () => {
    const newMessage = {
      message: input,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    // setIsTyping(true);
    await processMessageToChatGPT(newMessages);
    setInput("")
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat
    setLoading(true)

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      max_tokens: 1000, // change this for reponse length
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    try {
      await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        console.log(data)
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setLoading(false);
      });
    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
      setError(error)
      setLoading(false)
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
            {!loading && <TextField
              id="outlined-basic-email"
              label="Type Something"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              fullWidth
            />}
          </Grid>
          <Grid item xs={1} align="right">
            <Fab color="primary" aria-label="add">
              <SendIcon onClick={() => handleSend()}/>
            </Fab>
          </Grid>
          <Grid item xs={11}>
          {error && (<Alert severity="error">Error: {error.message}</Alert>)}
          </Grid>
        </Grid>
      </Grid>
      
  );
}
