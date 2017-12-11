import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './main.js';

const renderApp = () =>
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector('#app')
  );

renderApp();

if (module.hot) {
  module.hot.accept('./main.js', () => {
    renderApp();
  });
}
