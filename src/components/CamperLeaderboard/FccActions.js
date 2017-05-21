/**
 * FccActions.js
 @function getData
 @desc simulate getting remote paged data for fcc brownie points. We know how many
 rows there are in total, so we fake that and the remote sorting.
 @param endpoint {string}  - fcc user brownie point api, recent or alltime
 @param start     - simulate paging start row
 @param count     - simulate paging max row count
 @param sort_direction - simulate sorting
 */
export const getData = ( endpoint, start, count, sort_column, sort_direction) => {
  return fetch( `https://fcctop100.herokuapp.com/api/fccusers/top/${endpoint}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then( checkStatus)
  .then( parseJSON)
  .then( (response) => {
    // fake add the id
    const res = response.map( (item, ndx) => {
      return {...item, id: ndx+1};
    });
    // fake sort the data
    // we get the data sorted width direction 1 and zero isn't sorted
    if( sort_direction === -1){
      res.sort( ( a, b) => {
        if( a[sort_column] < b[sort_column]) return -1;
        if( a[sort_column] > b[sort_column]) return 1;
        return 0;
      });
    }
    return {
      data: res.filter( ( row, ndx) => {
        return ndx >= start && ndx < start+count;
      }),
      // we know how many rows there are
      total_rows: 100
    };
  });
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
