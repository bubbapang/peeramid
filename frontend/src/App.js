// import react shit
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

// import session shit
import { getCurrentUser } from './store/session';

// import components
import Welcome from './components/Welcome';
import Rating from './components/Rating';
import HomePage from './components/HomePage';

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
        <Route exact path="/rating" component={Rating} />
        <Route exact path="/home" component={HomePage} />

        {/* <AuthRoute exact path="/" component={Welcome} /> */}
        {/* <ProtectedRoute exact path="/tweets" component={Tweets} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/tweets/new" component={TweetCompose} /> */}
      </Switch>
    </>
  );
}
export default App;