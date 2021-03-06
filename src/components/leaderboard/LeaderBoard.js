import React, { PureComponent } from 'react';
import { addTA, deleteTA } from '../../actions/TA';
import { taCollection, questionCollection } from '../../services/firebase'

import './LeaderBoard.scss';
import TAForm from './TAForm';
import TAList from './TAList';
import Header from '../layout/Header';

export default class LeaderBoard extends PureComponent {
  handleSubmit = (name, cohort, event) => {
    event.preventDefault();
    const user = this.props.providerData[0].displayName
    addTA({ name: user, cohort, claimCount: 0});
  }

  handleDelete = (id) => {
    deleteTA(id);
  }

  getTAs = () => {	
    return taCollection.get().then(snap => {
      return snap.docs.map(doc => {
        return console.log(doc.data().name || 'User')
      })
    })
  }

  getCohorts = () => {
    return questionCollection.get().then(snap => {
      return snap.docs.map(doc => {
        return doc.data().channelName;
      })
    })
  }

  componentDidMount() {
    this.getTAs()
    this.getCohorts()
  }

  render() {
    return (
      <>
        <Header/>
        <TAForm 
          user={this.props.providerData[0].displayName} 
          handleSubmit={this.handleSubmit}
        />
        <TAList 
          handleDelete={this.handleDelete} 
        />
      </>
    );
  }
}
