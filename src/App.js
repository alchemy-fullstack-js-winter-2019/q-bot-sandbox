import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import QuestionDatabase from './components/QuestionDatabase';
import Header from './components/Header';
import withAuth from './components/withAuth';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/questions' component={withAuth(QuestionDatabase)} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
