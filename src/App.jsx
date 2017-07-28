import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous',
        color: 'black'
      },
      messages: [],
      userCount: 0,
    };
    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }


  componentDidMount() {

    this.ws = new WebSocket('ws://localhost:3001');

    this.ws.onmessage = (event) => {
      let msgRecieved = JSON.parse(event.data);
      if (msgRecieved.type === 'clientCount') {
        this.setState({userCount: msgRecieved.count})

        if (this.state.currentUser.color === 'black') {
          this.state.currentUser.color = msgRecieved.color;
        }

      } else {

        let msgNow = this.state.messages.concat(msgRecieved);
        this.setState({messages: msgNow});
      }
    }
  };

  newMessage(message) {
    let msg = {
      type: 'message',
      content: message,
      username: this.state.currentUser.name,
      messageColor: this.state.currentUser.color
    };
    this.ws.send(JSON.stringify(msg));
  };

  newUser(username) {
    if (this.state.currentUser.name !== username) {
      let nNotification = {
        type: 'notification',
        message: this.state.currentUser.name + ' has changed username to ' + username
      };
      this.ws.send(JSON.stringify(nNotification));
      this.state.currentUser.name = username;
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="usercount">
            {this.state.userCount} users online
          </span>
        </nav>
        <MessageList
          messages={this.state.messages} />
        <ChatBar
          onSend={this.newMessage}
          username={this.state.currentUser.name}
          onSendUser={this.newUser} />
      </div>
    )
  }
}
export default App;