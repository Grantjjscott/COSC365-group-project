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

// handler = new mainpageHandler();

// // When the window loads, getCurrentPost() will be triggered.
// window.onload = () => {
//   handler.getCurrentPost();
//   handler.getComments();
// }