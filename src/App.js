import React from 'react';
import {
  Container,
  Flex,
  Box,
} from 'rendition';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import styled from 'styled-components';


import Navbar from './components/Navbar';
import DevicesTable from './components/DevicesTable';
import reducers from './stateManager/reducers';
import clientMiddleware from './stateManager/middleware/client';
import api from './helpers/ApiClient';
import BrightnessControl from './components/BrightnessControl';
import NotificationBar from './components/NotificationBar';
import ActionBar from './components/ActionBar';

/*
 * Setup Redux Store with the Middleware.
 * */
const reduxStore = createStore(
  reducers,
  applyMiddleware(
    clientMiddleware(api),
    thunk,
  ),
);

const BrightnessControlWrapper = styled(Box)`
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const AppWrapper = styled.div`
  height: 100%;
  min-height: 100%;
`;

export default () => (
  <Provider store={reduxStore}>
    <AppWrapper>
      <Navbar />
      <ActionBar />
      <Container>
        <NotificationBar />
        <Flex flexWrap="wrap-reverse">
          <Box width={[1, 1, 1 / 2, 2 / 3]} pr={[0, 0, 3]}>
            <DevicesTable />
          </Box>
          <BrightnessControlWrapper mb={[3, 0]} width={[1, 1, 1 / 2, 1 / 3]} bg="tertiary.dark">
            <BrightnessControl />
          </BrightnessControlWrapper>
        </Flex>
      </Container>
    </AppWrapper>
  </Provider>
);
