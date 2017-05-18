
export const getData = ( endpoint) => {
  return fetch( `https://fcctop100.herokuapp.com/api/fccusers/top/${endpoint}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then( checkStatus)
  .then( parseJSON)
  .then( function( response){ return response});
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}
