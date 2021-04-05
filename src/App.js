import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // Using the observer pattern the auth event stream is passed the onAuth ... async.. function as the next function
    // we could also pass an error function
    // we set unsubscribe because the stream is always exists, so we need to stop listneing when the component unmounts
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // Snapshot alone gives us id but no properties
          // .data gives us a snapshot of our document's properties as an object
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // this closes the subscription when the App component is unmounted
  }

  render() {
    return (
      <div>
        {/* <Homepage /> */}
        <Header />
        <Switch>
          {/* Renders the first correct matched path*/}
          <Route exact path="/" component={Homepage} />
          {/* Exact renders only the homepage */}
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

// Get the current user from redux state
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// App doesn't need current user, it only sets it, doesn't do anything here
// Object passed here to an action object that is going to passed to every reducer

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
