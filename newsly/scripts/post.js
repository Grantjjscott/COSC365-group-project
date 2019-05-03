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
  });

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
            <form onsubmit="dummy()">
              <div class='form-group mb-4'>
                <input class='form-control' type="text" id="name" placeholder="Name" />
              </div>
              <div class="form-group">
                <textarea id='comment' class="form-control" rows="3"
                  placeholder='Write your comment here . . .'></textarea>
              </div>
              <button type="submit" class="btn btn-primary" onclick =gotoComments(this.value) >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  $("#postPage").before(template);
}

const dummy = (e) => {
  e.preventDefault();
  let userName = document.getElementById('name').value;
  let textArea = docuemnt.getElementById('comment').value;

  console.log(userName);
  console.log(textArea);
}


function addComments(key) {
  let postData = {
    "comments": [
      {
        "comment": {
          "user": 'Zac',
          "date": '02/13/1998',
          "text": ''
        }
      }
    ]
  }

  let updates = {};

  updates['/Feedback/' + key] = postData;
  fireabse.database().ref().push(updates);
}

window.onload = () => {
  addComments(id);
}