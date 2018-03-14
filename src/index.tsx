import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import Root from './Root';
import configureStore, { history } from './store';

// tslint:disable-next-line:no-any
declare var module: { hot: any };

const store = configureStore();

const renderWithHotReload = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Root history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderWithHotReload();

if (module.hot) {
  module.hot.accept('./Root', () => {
    const RootContainer = require('./Root').default;
    renderWithHotReload();
  });
}
