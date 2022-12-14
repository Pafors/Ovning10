onmessage = (e) => {
  getApi(e.data);
}

function getApi(fullUri) {
  fetch(fullUri)
      .then(res => res.json())
      .then(data => {
          postMessage(data);
      })
      .catch(err => console.log(err))
}
