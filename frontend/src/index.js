import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './redux/store';
import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import SkeletonLoad from './utils/SkeletonLoad';
import './index.css';

const App = lazy(() => import('./App'));
const LandingPage = lazy(() => import('./components/landing page/LandingPage'));

const connectedStore = store;

ReactDOM.render(
  <Provider store={connectedStore}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<SkeletonLoad />}>
        {/* <Redirect from="/"  exact to="/landing" /> */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/EMapp" component={App} />
        </Switch>
      </Suspense>
      {/* <App history={history} /> */}
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);
