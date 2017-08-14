import fetch from 'isomorphic-fetch';

export const requestApi = (apiUrl) => async (method, path, params) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: params && JSON.stringify(params),
  };

  const response = await fetch(`${apiUrl}/${path}`, options);
  if (response.status >= 200 && response.status < 300) {
    const json = await response.json();
    return json;
  }

  throw response.status;
};

