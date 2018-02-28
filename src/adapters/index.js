const baseUrl = `http://localhost:3001/api/v1`;

function headers() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
}

export class RestfulAdapter {
  static indexFetch(route) {
    return fetch(`${baseUrl}/${route}`, getRequest()).then(res => res.json());
  }
  static showFetch(route, id) {
    return fetch(`${baseUrl}/${route}/${id}`, getRequest()).then(res => res.json());
  }
  static createFetch(route, body) {
    return fetch(`${baseUrl}/${route}`, postRequest(body)).then(res => res.json());
  }
  static editFetch(route, id, body) {
    return fetch(`${baseUrl}/${route}/${id}`, patchRequest(body)).then(res => res.json());
  }
  static deleteFetch(route, id) {
    return fetch(`${baseUrl}/${route}/${id}`, {
      method: "DELETE",
      headers: headers()
    }).then(res => res.json());
  }
}

//these may not be necessary, but if you're setting up a variety of get, post,
//and patch requests, it may be helpful to abstract their structure as well:
function getRequest() {
  return {
    headers: headers()
  };
}

function patchRequest(body) {
  return {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(body)
  };
}

function postRequest(body) {
  return {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  };
}

//this is a very basic error handling function.  API responses come with a key,
//response.ok, which will be true if the status is below 400 and false if above.
function responseHandler(response) {
  return response => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("ERROR", response.json());
    }
  };
}

//Adapters allow us to abstract out repetitive code, such as the base url and headers
//using thunk, we return are returning a function here instead of
//a plain object.  Thunk intercepts this returned value, and if it is a
//function, cancels the normal event of calling our reducers, and
//instead, passes in 'dispatch' as an argument to the function.
//the fetch request was extracted out to our adapter, but still functions the same
