import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';

import routes from './routes';

const Root = ({ history }) => (
  <ConnectedRouter history={history}>
    {routes}
  </ConnectedRouter>
);

export default Root;
