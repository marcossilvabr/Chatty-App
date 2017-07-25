import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.state = {
      username: '',
      message: ''
    };
  }

  handleChange(e) {
    if (e.key === 'Enter') {
      this.state.message = e.target.value;
      if (!this.state.username) {
        this.state.username = 'Anonymous';
      }
      this.props.onSend(this.state.message, this.state.username);
    }
  }
  handleUsername(e) {
    this.state.username = e.target.value
  }


  render() {
    return (

      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyUp={this.handleUsername} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleChange} />
      </footer>
    )
  }
}
export default ChatBar;