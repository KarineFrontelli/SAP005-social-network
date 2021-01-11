const firestore = firebase.firestore().collection('posts');

export const likeFirebase = (id) => firestore.doc(id).update({
  likes: firebase.firestore.FieldValue.increment(1),
})
  .then(() => true)
  .catch((error) => error);

export const editPost = (id, valorNovoPost) => firestore.doc(id).update({
  post: valorNovoPost,
})
  .then(() => true)
  .catch((error) => error);

export const excluirPostBanco = (id) => firestore.doc(id).delete()
  .then(() => true)
  .catch((error) => error);

export const Google = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const Facebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const Conta = (email, senha, userName) => {
  firebase.auth().createUserWithEmailAndPassword(email, senha).then((userReturn) => {
    userReturn.user.updateProfile({
      displayName: userName,
    }).then(() => {
      // Update successful.
    }, (error) => {
      // An error happened.
      alert('An error happened.', error);
    });
    // console.log('usuario', userReturn);
    // alert('usuario criado e logado');
  });
};

export const Email = (email, senha) => firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
});

export const nomeUsuario = () => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.querySelector('#userName').innerHTML = `Olá, ${user.displayName}`;
  } else {
    // No user is signed in.
  }
});

export const criarBanco = (post) => firebase.firestore().collection('posts').add(post).then(() => {

});
