import resolveUrl from 'resolve-url';

/**
 * High order function to set the response handler
 * to the 'get' and 'fetch' functions.
 *
 * @param {Promise} promise - Promise to be processed.
 * @returns {Promise} The given promise with the response handler.
 */
function handleResponse(promise) {
  return promise.then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .then((err) => {
        throw new Error(`Unable to complete this action: ${err.message}`);
      });
  });
}

/**
 * Function to build the Api endpoint.
 *
 * @param {string} path - Path to reach the server.
 * @returns {string} Api Endpoint.
 */
export function getApiEndpoint(path) {
  const { REACT_APP_API_URL } = process.env;
  return resolveUrl(REACT_APP_API_URL, path);
}

/**
 * Function to reach the server as GET request.
 *
 * @param {string} path - Path to reach the server.
 * @returns {Promise} Fetch promise.
 */
export function get(path) {
  const promise = fetch(getApiEndpoint(path));
  return handleResponse(promise);
}

/**
 * Function to reach the server as PATCH request.
 *
 * @param {string} path - Path to reach the server.
 * @param {Object} data - Data to be sent to the server.
 * @returns {Promise} Fetch promise.
 */
export function patch(path, data) {
  const promise = fetch(getApiEndpoint(path), {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(promise);
}

export default {
  get,
  patch,
};
