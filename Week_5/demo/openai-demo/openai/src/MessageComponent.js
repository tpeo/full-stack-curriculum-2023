import {ListItem, Grid, ListItemAvatar, Avatar, ListItemText} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ComputerIcon from '@mui/icons-material/Computer';
import './App.css';

function MessageComponent({number, message, responder}) {
  const now = new Date();
  return (
    <ListItem key={number}>
        <Grid container>
            <Grid item xs={12}>
                <ListItemAvatar
                 align={responder === "ChatGPT" ? "left" : "right"} 
                 >
                    <Avatar>
                        {responder === "ChatGPT" ? <ComputerIcon/> : <AccountCircleIcon/>}
                    </Avatar>
                </ListItemAvatar>
            </Grid>
            <Grid item xs={12}>
                <ListItemText align={responder === "ChatGPT" ? "left" : "right"}
                primary={message}/>
            </Grid>
            <Grid item xs={12}>
                <ListItemText align={responder === "ChatGPT" ? "left" : "right"}
                secondary={`${now.getHours()}:${now.getMinutes()}`}/>
            </Grid>
        </Grid>
    </ListItem>
  );
}

export default MessageComponent;
