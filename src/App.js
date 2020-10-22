import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import ShopPage from "./pages/shop/shop.component";
import Homepage from "./pages/homepage/homepage.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from './components/header/header.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser : null
    };
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // Snapshot alone gives us id but no properties
          // .data gives us a snapshot of our document's properties as an object
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      } else {
        this.setState({ currentUser: userAuth});
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();  // this closes the subscription when the App component is unmounted
  }

  render() {
    return (
      <div>
        {/* <Homepage /> */}
        <Header currentUser={this.state.currentUser} />
        <Switch>  { /* Renders the first correct matched path*/}
          <Route exact path='/' component={Homepage} /> {/* Exact renders only the homepage */}
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
