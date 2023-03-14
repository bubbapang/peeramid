// import react shit 
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

// import session shit
import { getCurrentUser } from './store/session';

// import components
import { AuthRoute } from './components/Routes/Routes';
import Welcome from './components/Welcome';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return loaded && (
    <>
      <Switch>
        <AuthRoute exact path="/" component={Welcome} />
      </Switch>
    </>
  );
}
export default App;