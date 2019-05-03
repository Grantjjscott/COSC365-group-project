const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id');

console.log(id);

let query = database.ref('news/').child(id)
  .once('value')
  .then(function (data) {
    console.log(data);
    console.log(data.val())
  })