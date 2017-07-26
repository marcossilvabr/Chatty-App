import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  newMessage (message, username) {
    const newMessage = {username: username, content: message};
    const messages = this.state.messages.concat(newMessage);

    let msg = {
      //id: id,
      type: "message",
      content: message,
      username: username
    };

    this.ws.send(JSON.stringify(msg));
    this.setState({messages: messages})

  }


  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.newMessage = this.newMessage.bind(this);
    console.log(this);

  }
  componentDidMount() {

    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onmessage = function (event) {
      console.log(event.data);
    }
    console.log(this);

  };
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar onSend={this.newMessage} />

      </div>
    )
  }
}
export default App;