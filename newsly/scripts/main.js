const results = [];
function showPost() {


  lvl = results[results.length - 1]
  obj = JSON.parse(lvl)

  headline = obj.headline
  img = obj.img;
  date = obj.date;
  link = obj.link;
  summary = obj.summary;

  const template = '<div class="card mb-4" id=' + lvl + '>\
  <img class="card-img-top" src="'+ img + '" alt="Card image cap"/>\
  <div class="card-body"> <h2 class="card-title">'+ headline + '</h2>\
  <p class="card-text"> '+ summary + ' <br/>  </p></div>\
  <a href='+ link + '>source</a> <a href="#" class="btn btn-primary">Comments &rarr;</a><div class="card-footer text-muted">Posted: ' + date + ' </div></div></div>'
  $("#posts").append(template);

}

/*

*/
const eventifiy = (arr, callback) => {
  arr.push = (e) => {
    Array.prototype.push.call(arr, e);
    callback(arr);
  };
};

class mainpageHandler {

  signOut() {
    console.log("signing out")
    firebase.auth().signOut().then(() => {
      console.log('Successfully Signed out');
    }).catch(function (error) {
      return res.status(400).json(error);
    });
  }

  getAllPosts() {
    let query = database.ref('news/');
    eventifiy(results, (newArray) => {
      showPost();
    });

    query.on("child_added", function (data) {
      results.push(JSON.stringify(data.val()));
    });
  }
}

handler = new mainpageHandler();

window.onload = () => {
  handler.getAllPosts();
}


