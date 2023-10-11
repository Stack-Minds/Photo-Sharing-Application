var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/

const link = window.location.origin;

function fetchModel(url) {
  return new Promise(function(resolve, reject) {
    fetch(link + url)
    .then(response => {
      if (!response.ok)
          reject({status: response.status, statusText: response.statusText});
          return response.json();
      })
    .then(getResponseObject => {
      resolve({ data : getResponseObject });
    })
    .catch( error => {
      reject(error);
    });
      console.log(url);
  });
}

export default fetchModel;
