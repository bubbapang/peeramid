// import react shit
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

// import session shit
import { getCurrentUser } from './store/session';

// import components
import Welcome from './components/Welcome';
// import Rating from './components/Rating';
import Home from './components/Home';
import Navigation from './components/Home/Navigation';
import Feed from './components/Feed';
import Suggestion from './components/Suggestion';
import Rating from './components/Rating';
import Signup from './components/Welcome/SignupForm';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Switch>
        <Route exact path="/" component={Welcome} />

        <Route exact path="/home" >
          <Navigation />
          <Home />
        </Route>

        <Route exact path="/profile">
          <Home />
        </Route>


        <Route exact path="/feed">
          <Navigation />
          <Feed />
        </Route>

        <Route exact path="/rating">
          <Navigation />
          <Rating />
        </Route>

        <Route exact path="/suggestions">
          <Navigation />
          <Suggestion />
        </Route>

        
        <Route exact path="/signup">
          <Signup />
        </Route>

      </Switch>
    </>
  );
}
export default App;