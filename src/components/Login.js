import React, { Component } from 'react';
import { subscribe } from '../services/firebase';

export default class Login extends Component {
  state = {
    provider: ''
  }

  componentDidUpdate() {
    subscribe(user => {
      console.log('login component', user)
    }, this.state.provider)
  }

  componentDidMount() {
    subscribe(user => {
      if(user) {
        this.props.history.replace('/questions');
      }
    })
  }

  handleClick = ({ target }) => {
    this.setState({ provider: target.value })
  }

  render() {
    return (
      <>
        <h1>Q BOT LOGIN</h1>
        <button name='google' value='google' onClick={this.handleClick}>Google</button>
        <button name='github' value='github' onClick={this.handleClick}>GitHub</button>
      </>
    );
  }
 
}
