//starting vals
let keys = new Array();
let sources = new Array();
let i = 0;
let last = '';

function gotoComments(val) {
  id = (val.id);
  let url = `post.html?id=${keys[id]}`;
  window.location = url;
}

function render(data) {
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
  <div class=" card  shadow m-4  border-primary" id=${i}>
    <img class="card-img-top" src="${img}" alt="Card image cap"/>
    <div class="card-body"> 
      <h4 class="card-title">${headline}</h4>
      <p class=" card-text">${summary}<br/></p>
    </div>
    <div class ='text-center'>
      <a class="btn btn-link" href=${link}>Source</a>
      <div class="btn btn-outline-primary mb-2" id="${i}" value= "${i}" onclick="gotoComments(this)" value=${key}>Comments</div>
    </div>
    <div class="card-footer text-muted">Published: ${date}</div>
  </div>`

  if ((i % 2) == 0) {
    $('#posts').before('<div class= card-deck id = ' + parseInt(i / 2) + '>')
  }
  if (headline != null) {
    $("#" + parseInt(i / 2) + ".card-deck ").append(template)
  }
  i++;
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
    query.orderByChild("id").limitToFirst(20).startAt(last).on("child_added", function (data) {
      if (keys.includes(data.key) || sources.includes(data.val().img)) {

      } else {
        render(data);
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

window.onload = () => {
  handler.getLastTwentyPosts();
}