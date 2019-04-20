const results = [];
var i = 0;
function showPost() {


  lvl = results.length
  obj = JSON.parse(results[results.length - 1])

  headline = obj.headline
  img = obj.img;
  date =  new Date(obj.date);
  link = obj.link;
  summary = obj.summary;
  
  const template = 
  `
  
  <div class="card mb-4" id=${i}>
  <img class="card-img-top" src="${img}" alt="Card image cap"/>
  <div class="card-body"> <h2 class="card-title">${headline}</h2>
  <p class="card-text">${summary}<br/>  </p></div>
  <div class=" btn btn-link" href=${link}>source</div> 
  <a href="#" class="btn btn-primary mb-2">Read More &rarr;</a>
  
  <div class="card-footer text-muted">Posted: ${date}</div></div></div>`
  if ( headline != null){
  if(i==0){
  $("#posts").before(template);
  console.log(headline)
 
  }
  let target =i-1
  if(i>0){
    console.log("#"+i);
    console.log(headline)
    $("#"+target).before(template);
  
  }
  i=i+1;
  

}
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


