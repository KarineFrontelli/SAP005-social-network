const firestore = () => firebase.firestore().collection('posts');

export const getAllPosts = () => firestore().orderBy('date', 'desc').get()
  .then((snapshot) => {
    const posts = snapshot.docs;
    console.log(posts);
    return posts;
  });

export const likeFirebase = (id) => firestore().doc(id).update({
  likes: firebase.firestore.FieldValue.increment(1),
})
  .then(() => true)
  .catch((error) => error);

export const editPost = (id, valorNovoPost) => firestore().doc(id).update({
  post: valorNovoPost,
})
  .then(() => true)
  .catch((error) => error);

export const excluirPostBanco = (id) => firestore().doc(id).delete()
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
    const nome = user.displayName;
    const primeiroNome = nome.split(' ')[0];
    document.querySelector('#userName').innerHTML = `<img class="photo-profile" src="${user.photoURL}"> Olá, ${primeiroNome} `;
  } else {
    // No user is signed in.
  }
});

export const criarBanco = (post) => firestore().add(post).then(() => {

});

export const logout = () => {
  firebase.auth().signOut().then(() => {
    window.location = '/';
  });
}
