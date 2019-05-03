

//starting vals

let keys = new Array();
let sources = new Array();
var i = 0;

var last= '';



<<<<<<< HEAD
function render(data) {
=======
// queries feedback branch for matching key
function getComments(postKey) {
  let query = database.ref('Feedback').child(postKey)
    .on("value", function (data) {
      console.log(data.val());
    });
}

function render(data){
  obj = data
>>>>>>> 6f51dfb98c214bfd29add5e5526c6b31ffbc04f6
  key = (data.key);
  console.log(key);
  keys.push(data.key);
<<<<<<< HEAD
  //console.log(keys);
  objects.push(data);
  //console.log(data);
  //console.log(objects);
  last = data.val().date;
=======
  last =data.val().id
>>>>>>> 6f51dfb98c214bfd29add5e5526c6b31ffbc04f6
  headline = data.val().headline;
  img = data.val().img;
  sources.push(img)
  date = new Date(data.val().date);
  
  link = data.val().link;
  
  summary = data.val().summary;

  const template = `
  <div class="card mb-4 border-primary" id=${i}>
    <img class="card-img-top" src="${img}" alt="Card image cap"/>
<<<<<<< HEAD
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

=======
  <div class="card-body"> <h4 class="card-title">${headline}</h4>
  <p class="card-text">${summary}<br/>  </p></div>
  <div class ='text-center'>
    <a class="btn btn-link" href=${link}>Source</a>
    <div class="btn btn-outline-primary mb-2" value== ${key}> Comments</div>
  </div>
  <div class="card-footer text-muted">Posted: ${date}</div></div></div>`

  
  
>>>>>>> 6f51dfb98c214bfd29add5e5526c6b31ffbc04f6
  if (headline != null) {
    if (i == 0) {
      $("#posts").before(template);
      $('#'+i).bind("click", function(){
        getComments(key);
      });
      
    }
    let target = i - 1
    if (i > 0) {
      $("#posts").before(template)

      $('#'+i).bind("click", function(){
        getComments(key);

<<<<<<< HEAD
    //console.log(i)
=======
    });
  }
  console.log(i)
>>>>>>> 6f51dfb98c214bfd29add5e5526c6b31ffbc04f6
    i = i + 1;
    
  }
}


class mainpageHandler {

  getLastTwentyPosts() {
    let query = database.ref('news/');
    query.orderByChild("id").limitToFirst(20).on("child_added", function (data) {
      if (!(keys.includes(data.key))  ){
      render(data);
      }
    });
  }

<<<<<<< HEAD
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
=======

  getNextTwenty(){
   
    let query = database.ref('news/');
    console.log('query');
    query.orderByChild("id").limitToFirst(20).startAt(last).on("child_added", function (data) {

      console.log((keys[(keys.length)-1]))
      console.log(data.key)
      if (keys.includes(data.key) ||sources.includes(data.val().img))  {
        console.log("dupilacte found")
      }
      else {
>>>>>>> 6f51dfb98c214bfd29add5e5526c6b31ffbc04f6
        render(data);
      }
      
    });

  }

  }
  

  $(window).scroll(function () { 
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10 && i< 100) {
      
      handler.getNextTwenty();
    }
  });

handler = new mainpageHandler();
// main call
window.onload = () => {
  //main triger
  handler.getLastTwentyPosts();
  //testing comment function
<<<<<<< HEAD
  handler.detailedPost();
}
=======
  
    
    
  
  
 
 
}





  
     
   
  





>>>>>>> 6f51dfb98c214bfd29add5e5526c6b31ffbc04f6
