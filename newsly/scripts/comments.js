// class loadPost {

//   getComments() {
//     let query = database.ref('Feedback');
//     query.equalTo(Postkey).on("Value", function (snapshot) {
//       console.log(snapshot.val());
//       snapshot.forEach(function (data) {
//         console.log(data.key);
//       });
//     });
//   }
// }

// Grabs form and adds event listener for when user submits the comment.
const form = document.querySelector("form");
form.addEventListener("submit", postComment);

// Grabs the comment and then pushes it to the query in the database.
const postComment = (e) => {
  e.preventDefault();
  let comment = document.getElementById('comment').value;

  if (name) {
    let query = database.ref('Feedback');
    query.push({
      date: new Date(),
      text: comment,
      user: hello // HELP
    });
  }

  document.getElementById('comment').value = '';
}

const addComment = (date, text, user) => {
  let comments = document.getElementById('user-comment');

  const template =
    `<div id='user-comment' class='media mb-4'>
        <img class='d-flex mr-3 rounded-circle' src=${source} alt='Photo from the article'>
        <div class='media-body'>
          <h5 class='mt=0'>${user}</h5>
          ${postData}
        </div>
     </div>
    `;

  comments.innerHTML = template;
}

// handler = new mainpageHandler();

// // When the window loads, getCurrentPost() will be triggered.
// window.onload = () => {
//   handler.getCurrentPost();
//   handler.getComments();
// }