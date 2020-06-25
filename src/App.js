import { withAuthenticator } from '@aws-amplify/ui-react'
import React, { Component } from 'react'
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import newCoach from './newCoach';
import showCoaches from './showCoaches';
import MainNav from './mainNav';
import landing from './landing';
Amplify.configure(awsconfig);


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainNav />
        <main>
          <Switch>
            <Route path="/" component={landing} exact/>
            <Route path="/AddCoach" component={newCoach} exact/>
            <Route path="/Gallery" component={showCoaches} exact />
            {/* <Route path="/Gallery/:id" component={showOneCoach} /> */}
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}



export default withAuthenticator(App);

