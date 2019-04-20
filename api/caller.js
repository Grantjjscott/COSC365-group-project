class fireStarter {
    start() {
      const config = {
        apiKey: "AIzaSyBV4dw1tPFOVwlJDp1NFyxeSWn7JseJKc8",
        authDomain: "cosc365.firebaseapp.com",
        databaseURL: "https://cosc365.firebaseio.com",
        projectId: "cosc365",
        storageBucket: "cosc365.appspot.com",
        messagingSenderId: "218187384395"
      };
      firebase.initializeApp(config);
  
      console.log("loaded");
    }
  }
  function writeNewPost(article) {
    // A post entry.
    console.log("yeet")
    var postData = {
      headline: article.title,
      date: article.publishedAt,
      img: article.urlToImage,
      link: article.url,
      summary: article.description,
      comments:[]
      
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('news').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates ={}
    updates['/news/' + newPostKey]=postData;
  return firebase.database().ref().update(updates)
  
    
  }
const apiResults =[];
  
  
  starter = new fireStarter();
  starter.start();
  database = firebase.database();

var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=87bdd4b62d384ac3b9b991a3a24da7cb';
var request = new XMLHttpRequest();

request.open('GET', url, true)

request.onload = function(){
    var data= JSON.parse(this.response);
    data.articles.forEach(article =>{
    writeNewPost(article);


    }
    )
}
request.send()

