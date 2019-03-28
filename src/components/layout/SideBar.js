import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { signOut } from '../../services/firebase';
import './SideBar.scss';

export default class SideBar extends React.Component {
  state = {
    menuOpen: false
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  handleSignOut = () => {
    signOut();
  }

  render() {
    return (
      <>
        <Menu width={ '50%' }
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <Link className="menu-item" to="/questions" 
            onClick={() => this.closeMenu()}
          >
            Queue
          </Link>
          <br/>
          <br/>
          <Link className="menu-item" to="/leaderboard" 
            onClick={() => this.closeMenu()}
          >
            Leaderboard
          </Link>
          <br/>
          <br/>
          <button name='signout' value='signout'
            onClick={this.handleSignOut} 
            className={'logout'}
          >
            Sign Out
          </button>
        </Menu>
      </>
    );
  }
}
