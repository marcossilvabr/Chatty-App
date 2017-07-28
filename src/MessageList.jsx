import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    return (
      <main className="messages">
        {this.props.messages.map((item, index) => {
          if (item.type === 'notification') {
            return <div className="message system" key={index}>{item.message}</div>
          } else {
            return (
              <Message
                username={item.username}
                content={item.content}
                messageColor={item.messageColor}
                key={index} />
              )
            }
        })}
      </main>
    )
  }
}
export default MessageList;