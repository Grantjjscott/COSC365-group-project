//starting vals
const results = [];
const keys = []
var i = 0;
// queries feedback branch for matching key
function getComments(postKey) {
  let query = database.ref('Feedback').child(postKey)
    .on("value", function (data) {
      console.log(data.val());
    });
}

// called when a post is pushed to the results[] it renders them back to front
function showPost() {
  obj = (results[results.length - 1])
  key = (obj.key);
  console.log(key);
  headline = obj.val().headline
  img = obj.val().img;
  date = new Date(obj.val().date);
  link = obj.val().link;

  summary = obj.val().summary;

  const template = `
  <div class="card mb-4" id=${i}>
    <img class="card-img-top" src="${img}" alt="Card image cap"/>
  <div class="card-body"> <h4 class="card-title">${headline}</h4>
  <p class="card-text">${summary}<br/>  </p></div>
  <div class ='text-center'>
    <a class="btn btn-link" href=${link}>Source</a>
    <a href="#" class="btn btn-outline-primary mb-2"> Comments</a>
  </div>
  <div class="card-footer text-muted">Posted: ${date}</div></div></div>`

  if (headline != null) {
    if (i == 0) {
      $("#posts").before(template);
    }
    let target = i - 1
    if (i > 0) {
      $("#" + target).before(template);
    }
    i = i + 1;
  }
}

// make the array.push an event so each time push is called we render a post
const eventifiy = (arr, callback) => {
  arr.push = (e) => {
    Array.prototype.push.call(arr, e);
    callback(arr);
  };
};

class mainpageHandler {
  // signout
  signOut() {
    console.log("signing out")
    firebase.auth().signOut().then(() => {
      console.log('Successfully Signed out');
    }).catch(function (error) {
      return res.status(400).json(error);
    });
  }
  // gets all posts from db and then pushes them to results array
  getAllPosts() {
    let query = database.ref('news/');
    eventifiy(results, (newArray) => {
      showPost();
    });

    query.orderByChild("date").on("child_added", function (data) {

      results.push(data);
    });
  }
}

handler = new mainpageHandler();
// main call
window.onload = () => {
  //main triger
  handler.getAllPosts();
  //testing comment function
  getComments('0')
}




