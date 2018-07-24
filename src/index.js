import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'rendition';
import styled from 'styled-components';

import './index.css';
import theme from './theme';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const RenditionProvider = styled(Provider)`
  height: 100%;
  min-height: 100%;
`;

ReactDOM.render(
  <RenditionProvider theme={theme}>
    <App />
  </RenditionProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
