//starting vals
let keys = new Array();
let sources = new Array();
let i = 0;
let last = '';


function gotoComments(id) {
  console.log(id);
  let url = `post.html?id=${keys[id]}`;
  window.location = url;

}

function renderPost(data) {
  obj = data
  key = (data.key);
  keys.push(data.key);
  last = data.val().id
  headline = data.val().headline;
  img = data.val().img;
  sources.push(img)
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
            <button type="submit" value = ${i} class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Single Comment -->
    <div id='user-comment'>
    </div>
  </div>
  `

  $("#postPage").before(template);
  if (headline != null) {
    if (i == 0) {

      // $('#' + i).bind("click", function () {
      // thisKey=$('#'+i).value
      //getComments(Key);
      // });
    }

    let target = i - 1
    if (i > 0) {
      $("#postPage").before(template)
      $('#' + i).bind("click", function () {
        //console.log(key);
        getComments(key);
      });
    }
    console.log(i)
    i += 1;
  }
}

function render(data) {
  obj = data
  key = (data.key);
  console.log(key);
  keys.push(data.key);
  last = data.val().id
  headline = data.val().headline;
  img = data.val().img;
  sources.push(img)
  date = new Date(data.val().date);
  link = data.val().link;
  summary = data.val().summary;

  const template = `
  <div class="card mb-4 border-primary" id=${i}>
    <img class="card-img-top" src="${img}" alt="Card image cap"/>
    <div class="card-body"> 
      <h4 class="card-title">${headline}</h4>
      <p class="card-text">${summary}<br/></p>
    </div>
    <div class ='text-center'>
      <a class="btn btn-link" href=${link}>Source</a>
      <div class="btn btn-outline-primary mb-2" id="${i}b" onclick="gotoComments(${this.id})" value=${key}>Comments</div>
    </div>
    <div class="card-footer text-muted">Posted: ${date}</div>
  </div>`

  if (headline != null) {
    if (i == 0) {
      $("#posts").before(template);
      $('#' + i).bind("click", function () {
        gotoComments(i);
      });
    }

    let target = i - 1
    if (i > 0) {
      $("#posts").before(template)
      $('#' + i).bind("click", function () {
        console.log(i);
        console.log(key);
        gotoComments(i);
      });
    }
    console.log(i)
    i += 1;
  }
}

class mainpageHandler {

  getLastTwentyPosts() {
    let query = database.ref('news/');
    query.orderByChild("id").limitToFirst(20).on("child_added", function (data) {
      if (!(keys.includes(data.key))) {
        render(data);
      }
    });
  }

  getNextTwenty() {
    let query = database.ref('news/');
    console.log('query');
    query.orderByChild("id").limitToFirst(20).startAt(last).on("child_added", function (data) {

      console.log((keys[(keys.length) - 1]))
      console.log(data.key)
      if (keys.includes(data.key) || sources.includes(data.val().img)) {
        console.log("dupliacte found")
      } else {
        render(data);
      }
    });
  }

  getPost() {
    let query = database.ref('news/');
    query.orderByChild("id").limitToFirst(20).on("child_added", function (data) {
      if (!(keys.includes(data.key))) {
        renderPost(data);
      }
    });
  }

}

$(window).scroll(function () {
  if ($(window).scrollTop() >= $(document).height() - $(window).height() - 500) {
    handler.getNextTwenty()
  }
});

handler = new mainpageHandler();
// main call
window.onload = () => {
  //main triger
  handler.getLastTwentyPosts();
  handler.getPost();
  //testing comment function
}