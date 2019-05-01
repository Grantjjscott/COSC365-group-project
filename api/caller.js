
var i =0;
var headlines = new Array();
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

       var database = firebase.database();
      let query = database.ref('news/');
      query.limitToLast(1).on("value", function (data) {
        i= data.val().id;
      });
    }
  }

  function addComments(key){
    let postData = {"comments":[
      {
      "comment":{
        "user":"yeet",
        "date":"yeet",
        "text":"yeet"
    }
  }
    ]}

    let updates ={}

    updates['/Feedback/'+key] =postData;
    firebase.database().ref().update(updates);

  }
  function writeNewPost(article) {
    // A post entry.
   if(headlines.includes(article.title)){
     console.log('duplicate found');
   }
   else{
    headlines.push(article.title);
    console.log("yeet");
    let postData = {
      headline: article.title,
      date: article.publishedAt,
      img: article.urlToImage,
      link: article.url,
      summary: article.description,
      id: i,
    };
    let query = database.ref('news/');
    i--;
    
  
  
    // Get a key for a new Post.
    
    var newPostKey = firebase.database().ref().child('news').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates ={}
    updates['/news/' + newPostKey]=postData;

    firebase.database().ref().update(updates);
    addComments(newPostKey);
    
  }
    
  }

  function MainCall(){
      let apiResults =[];

      
     
      database = firebase.database();

    let url = 'https://newsapi.org/v2/top-headlines?' +
              'country=us&' +
              'apiKey=87bdd4b62d384ac3b9b991a3a24da7cb';
    let request = new XMLHttpRequest();

    request.open('GET', url, true)

    request.onload = function(){
        let data= JSON.parse(this.response);
        data.articles.forEach(article =>{
        writeNewPost(article);


        }
        )
    }
    request.send()
    }


    function CatCall(cat){
      let apiResults =[];

      
  
      database = firebase.database();

    let url = 'https://newsapi.org/v2/top-headlines?' +
              'country=us&' +
              'category=' +cat +'&'+
              'sortBy=popularity'+'&'+
              'apiKey=87bdd4b62d384ac3b9b991a3a24da7cb';
    let request = new XMLHttpRequest();

    request.open('GET', url, true)

    request.onload = function(){
        let data= JSON.parse(this.response);
        data.articles.forEach(article =>{
        writeNewPost(article);


        }
        )
    }
    request.send()

    };

    starter = new fireStarter();
    starter.start();
    //MainCall();
    CatCall('Science');
    CatCall('Sports');
    CatCall('General');