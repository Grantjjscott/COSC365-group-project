

function writeNewPost(key, username, body) {
  // A post entry.
  var postData = {
    author: username,
    body: body,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('Feedback').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/Feedback/' + key + '/comments/'] = postData;
  updates[newPostKey] = postData;

  return firebase.database().ref().update(updates);
}


Lde - Z8ppR294NX7Ttef