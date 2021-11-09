import React, {useState, useContext, useEffect} from 'react';
import { SocketContext} from '../socket';


const Messenger = () => {
  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {

    socket.on('connect', () => {
      console.log(`${socket.id} connected`);
    })
  
    socket.on('message', msg => {
      console.log(msg);
      setMessages([...messages, msg])
    })

    return () => {
      socket.off('connect');
      socket.off('message');
    }
    
  })

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const onClick = () => {
      console.log("Send Button Clicked!")
    socket.emit('message', message);
    setMessage("");
  };

  return (
    <div className="App">
      <h1 className="text-light">Messages</h1>
      <div className="text-light">
        {messages.map(msg => 
          (<p key={msg}>
            {msg}
            </p>
          ))}
      </div>
      <p>
        <input type="text" onChange={onChange} value={message} />
      </p>
      <p>
        <input type="button" onClick={onClick} value="Send"/>
      </p>
    </div>
  );
};

export default Messenger;