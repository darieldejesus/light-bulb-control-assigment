import clientMiddleware from '../../../../src/stateManager/middleware/client';

describe('Middleware client', () => {
  test('Should execute the action if this is a function', () => {
    const action = jest.fn();
    const client = {};
    const middleware = clientMiddleware(client);
    const next = middleware({
      dispatch: () => {},
      getState: () => {},
    });
    next()(action);
    expect(action).toBeCalled();
  });

  test('Should execute next action if action does not have a promise', () => {
    const nextCallBack = jest.fn();
    const client = {};
    const middleware = clientMiddleware(client);
    const next = middleware({
      dispatch: () => {},
      getState: () => {},
    });
    const action = {
      types: [],
      another_prop: [],
    };
    next(nextCallBack)(action);
    expect(nextCallBack).toBeCalledWith(action);
  });

  test('Should execute the promise in the "action" object', () => {
    const nextCallBack = jest.fn();
    const client = {};
    const middleware = clientMiddleware(client);
    const next = middleware({
      dispatch: () => {},
      getState: () => {},
    });
    const action = {
      types: ['REQUEST_STATUS', 'SUCCESS_STATUS', 'FAILURES_STATUS'],
      another_prop: [],
      promise: () => Promise.resolve(),
    };
    next(nextCallBack)(action);
    expect(nextCallBack).toBeCalledWith({ type: 'REQUEST_STATUS', another_prop: [] });
  });
});
