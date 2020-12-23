import { renderPage } from '../../router.js';


export const Google = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        history.pushState(null, null, "/home");
        renderPage()
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
      
};

export const Facebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      history.pushState(null, null, "/home");
        renderPage()
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });

};

// export const Conta = () => {
//    var provider = new firebase.auth.EmailAuthProvider();
//   firebase.auth().createUserWithEmailAndPassword(provider).then(function(result) {
//     var token = result.credential.accessToken;
//     var user = result.user;
//     history.pushState(null, null, "/home");
//       renderPage()
//   }).catch(function(error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     var email = error.email;
//     var credential = error.credential;
//   });
// };



export const Email = (email,senha) => {
    // var provider = new firebase.auth.EmailAuthProvider();
    firebase.auth().signInWithEmailAndPassword(email,senha).then(() => {
      alert("usuario criado e logado")
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  };

    

