// const form = document.querySelector("form");
// form.addEventListener("submit", postComment);

// // Grabs the comment and then pushes it to the query in the database.
// const postComment = (e, postKey) => {
//   e.preventDefault();
//   let comment = document.getElementById('comment').value;
//   let name = document.getElementById('name').value;
//   let date = new Date();

//   function writeUserData(date, comment, name) {
//     firebase.database().ref(`Feedback/${postKey}/comments/comment`).set({
//       date: date,
//       comment: comment,
//       name: name
//     });
//   }

//   // Call add comment passing in the data obtained from the form element.
//   addComment(date, comment, user);

//   document.getElementById('comment').value = '';
// }

// // Grabs the comment area from post.html and then puts in the data from the comment.
// const addComment = (date, comment, user) => {
//   let comments = document.getElementById('user-comment');

//   const template =
//     `<div id='user-comment' class='media mb-4'>
//         <img class='d-flex mr-3 rounded-circle' src=${source} alt='Photo from the article'>
//         <div class='media-body'>
//           <h5 class='mt=0'>${user}</h5>
//           ${comment}
//           ${date}
//         </div>
//      </div>
//     `;

//   comments.innerHTML = template;
// }

let keys = new Array();
let sources = new Array();
var i = 0;
let objects = new Array();
var last = '';

function render(data) {
  key = (data.key);
  console.log(key);
  keys.push(data.key);
  //console.log(keys);
  objects.push(data);
  //console.log(data);
  //console.log(objects);
  last = data.val().date;
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
    <div class='text-center'>
      <a class="btn btn-link" href=${link}>Source</a>
      <form action="post.html">
      <button type = "submit" class="btn btn-outline-primary mb-2" onclick = "detailedPost(${key})" value=${key} >Go To Post</button>
      </form>
    </div>
    <div class="card-footer text-muted">Posted: ${date}</div>
  </div>`

  if (headline != null) {
    if (i == 0) {
      $("#posts").before(template);
      $('#' + i).bind("click", function () {
        getComments(key);
      });
    }

    let target = i - 1
    if (i > 0) {
      $("#posts").before(template)
      $('#' + i).bind("click", function () {
        getComments(key);
      });
    }

    //console.log(i)
    i = i + 1;
  }
}


class mainpageHandler {

  getLastTwentyPosts() {
    let query = database.ref('news/');
    query.orderByChild("date").limitToFirst(20).on("child_added", function (data) {
      if (!(keys.includes(data.key))) {
        render(data);
      }
    });
  }

  // It can't find the postKey im passing but is able to find it up in the render so I have 
  // no idea how to get the specific news reference.
  detailedPost(postKey) {
    console.log('detailedPost Called');
    //console.log(postKey);
    let query = database.ref(`news/${postKey}`);
    query.on("value", function (data) {
      render(data);
      //console.log(data.id[0]);
      console.log(data.key);
    });
  }

  getNextTwenty() {
    let query = database.ref('news/');
    query.orderByChild("date").limitToFirst(20).startAt(last).on("child_added", function (data) {
      if (keys.includes(data.key) || sources.includes(data.val().img)) {
        console.log("duplicate found")
      } else {
        render(data);
      }
    });
  }
}


$(window).scroll(function () {
  if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10 && i < 100) {
    handler.getNextTwenty();
  }
});

handler = new mainpageHandler();

window.onload = () => {
  handler.getLastTwentyPosts();

  //testing comment function
  handler.detailedPost();
}