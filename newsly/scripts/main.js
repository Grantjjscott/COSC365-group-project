//starting vals
let keys = new Array();
let sources = new Array();
let i = 0;
let last = '';

// queries feedback branch for matching key
function getComments(postKey) {
  console.log(postKey);
  let query = database.ref(`Feedback/${postKey}`).child(postKey)
    .on("value", function (data) {
      console.log(data.key);
      //console.log(data.key.headline);
      console.log(data.val());
    });
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
      <div class="btn btn-outline-primary mb-2" onclick="getComments(${key})" value=${key}>Comments</div>
    </div>
    <div class="card-footer text-muted">Posted: ${date}</div>
  </div>`

  // IF I COMMENT THESE OUT THE ABOVE GET COMMENTS FREAKS. THIS HAS TO BE THE ID. DB NEEDS CHANGED
  if (headline != null) {
    if (i == 0) {
      $("#posts").before(template);
      // $('#' + i).bind("click", function () {
      //   getComments(key);
      // });
    }

    let target = i - 1
    if (i > 0) {
      $("#posts").before(template)
      // $('#' + i).bind("click", function () {
      //   //console.log(i);
      //   //console.log(key);
      //   getComments(key);
      // });
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
        console.log("dupilacte found")
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
// main call
window.onload = () => {
  //main triger
  handler.getLastTwentyPosts();
  //testing comment function
}














