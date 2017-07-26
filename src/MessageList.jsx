import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    return (
      <main className="messages">
        {this.props.messages.map((item, index) => {
          return <Message
            username={item.username}
            content={item.content}
            key={index} />
        })}

      </main>
    )
  }
}
export default MessageList;