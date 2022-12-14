// Get message (the URL)
onmessage = (e) => {
  getApi(e.data);
}

// Fetch the data and send it back as a message
function getApi(fullUri) {
  fetch(fullUri)
      .then(res => res.json())
      .then(data => {
          postMessage(data);
      })
      .catch(err => console.log(err))
}
