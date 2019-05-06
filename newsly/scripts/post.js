const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id');
console.log(id);

// This gets the news article from the database.
let query = database.ref('news/').child(id)
  .once('value')
  .then(function (data) {
    console.log(data);
    renderPost(data);
    console.log(data.val())
  });


// This gets the comments from the database
let commentQuery = database.ref('Feedback/').child(id)
  .once('value')
  .then(function (data) {
    console.log(data.val().comments);
    getComments(data);
  });

function getComments(data) {
  for (let i = 0; i < data.val().comments.length; i++) {
    let user = data.val().comments[i].comment.user;
    let text = data.val().comments[i].comment.text;
    let date = data.val().comments[i].comment.date;
    const stub = `
    <div class="card">
      <div class="card-header">
        ${user}
      </div>
      <div class="card-body">
        <p>${text}</p>
        <footer class="blockquote-footer">${date}</footer>
      </div>
    </div>`
    $("#user-comment").before(stub);
  }
}

function renderPost(data) {
  obj = data
  key = (data.key);
  last = data.val().id
  headline = data.val().headline;
  img = data.val().img;
  date = new Date(data.val().date);
  link = data.val().link;
  summary = data.val().summary;

  const template = `
    <div class="container" id="post">
      <div class="text-center">
        <h1 class="mt-4">${headline}</h1>
        <hr>
        <p>Posted on ${date}</p>
        <hr>
        <img class="img-fluid rounded" src="${img}" alt="">
        <hr>
        <p class="lead">${summary}</p>
        <hr>
        
        <!-- Comments Form -->
        <div class="card my-4">
          <h5 class="card-header">Leave a Comment:</h5>
          <div class="card-body">
            <form>
              <div class='form-group mb-4'>
                <input class='form-control' type="text" id="name" placeholder="Name" />
              </div>
              <div class="form-group">
                <textarea id='comment' class="form-control" rows="3"
                  placeholder='Write your comment here . . .'></textarea>
              </div>
              <button type="button" class="btn btn-primary" id='button'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  $("#postPage").before(template);
  let userName = document.getElementById('name');
  let textArea = document.getElementById('comment');
  let button = document.getElementById('button');
  userName.addEventListener("change", function () { userName = userName.value; });
  textArea.addEventListener("change", function () { textArea = textArea.value; });
  button.addEventListener("click", function () { writeNewPost(userName, textArea, key) });
}


function writeNewPost(userName, body, key) {
  // A post entry.
  const postData = {
    user: userName,
    text: body,
    date: new Date()
  };

  // Get a key for a new Post.
  let newPostKey = firebase.database().ref().child('Feedback').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  let updates = {};
  updates['/Feedback/' + key + '/comments/'] = postData;
  updates[newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

window.onload = () => {
}