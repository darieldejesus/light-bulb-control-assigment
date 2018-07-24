import { get, patch } from '../../../src/helpers/ApiClient';

describe('ApiClient', () => {
  const domain = 'http://www.api.test';

  beforeEach(() => {
    fetch.resetMocks();
    process.env = {
      REACT_APP_API_URL: domain,
    };
  });

  test('Should have a get function', () => {
    const data = {
      name: 'Test',
    };
    const requestPath = '/device';
    fetch.mockResponseOnce(JSON.stringify({ data }));

    // Call the `get` query.
    get(requestPath).then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${domain}${requestPath}`);
  });

  test('Should have a patch function', () => {
    const data = {
      id: 1,
      brightness: 10,
    };
    const requestPath = '/device';
    fetch.mockResponseOnce(JSON.stringify({ data }));
    patch(requestPath, data).then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${domain}${requestPath}`);
  });
});
