import { renderPage } from '../../router.js';

// import { nomeUsuario } from './data.js';

export const Home = () => {
  // Coloque sua página
  const pageHome = `
      <header>
        <h1 class="name-user" id="userName"></h1>
        <button class="btn-Logout" id="btnLogout">Sair</button>
      </header>
      <main class="main-home">
        <section class="post-enviar">
          <textarea class="post" id="textoPost" placeholder="Conte sobre sua última cerveja..."></textarea>
          <button id="btnPost" class="btn-post">Postar</button>
        </section>
        <section class="posts-enviados" id="feedArea">
        </section>
      </main>
    `;

  const rootElement = document.createElement('div');
  rootElement.innerHTML = pageHome;

  const nomeUsuario = () => firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.querySelector('#userName').innerHTML = `Olá, ${user.displayName}`;
    } else {
      // No user is signed in.
    }
  });

  nomeUsuario();

  const textoPost = rootElement.querySelector('#textoPost');
  const feedArea = rootElement.querySelector('#feedArea');
  const btnPost = rootElement.querySelector('#btnPost');
  btnPost.addEventListener('click', criarPost);

  function criarPost() {
    const userName = firebase.auth().currentUser.displayName;
    if (textoPost.value === '') {
      console.log('Digite alguma coisa!');
    } else {
      const feed = {
        post: textoPost.value,
        name: userName,
        uid: firebase.auth().currentUser.uid,
        date: new Date(),
        likes: 0,
      };

      firebase.firestore().collection('posts').add(feed).then(() => {
      });
      renderPage();
    }
  }

  function renderizarPosts() {
    firebase.firestore().collection('posts').orderBy('date', 'desc').get()
      .then((snapshot) => {
        const cardsOk = adicionaPostATela(snapshot.docs);
        feedArea.innerHTML = cardsOk;

        const btnEditar = '.btn-editar';
        const btnExcluir = '.btn-excluir';
        const btnLike = '.btnLike';

        feedArea.addEventListener('click', (event) => {

          console.log("foi clicado")
          const closestEditar = event.target.closest(btnEditar);
          if (closestEditar && feedArea.contains(closestEditar)) {
            const closestTextarea = closestEditar.parentNode.querySelector('.editar-post');
            closestTextarea.style.display = 'block';
            const closestBtnSalvarEdicao = closestEditar.parentNode.querySelector('.btn-salvar-editado');
            closestBtnSalvarEdicao.style.display = 'block';

            closestBtnSalvarEdicao.addEventListener('click', () => {
              closestTextarea.style.display = 'none';
              closestBtnSalvarEdicao.style.display = 'none';
              const closestPost = closestEditar.parentNode.querySelector('.texto-post');
              const postFinal = closestTextarea.value;
              closestPost.innerHTML = postFinal;
              const closestId = closestEditar.parentNode.querySelector('.id-escondido').innerText;

              firebase.firestore().collection('posts').doc(closestId).update({
                post: postFinal,
              })
                .then(() => {
                  closestPost.innerHTML = postFinal;
                });
            });
          }

          const closestLike = event.target.closest(btnLike);
          if (closestLike && feedArea.contains(closestLike)) {
            // console.log('Curtiu tá Top');
            const closestIdLike = closestLike.parentNode.querySelector('.id-escondido').innerText;

            // console.log(closestIdLike);
            const likeBtn = firebase.firestore().collection('posts').doc(closestIdLike);

            let postJafoiCurtidoAlgumaVez = false;
            const usuarioLogado = firebase.auth().currentUser.uid;
            const usuarioLogadoJaCurtiuEssePost = firebase.firestore().collection('posts')
              .doc(closestIdLike).collection('TB_QUEM_CURTIU');
            const usuarioQueCurtiu = {
              usuarioQueCurtiu: firebase.auth().currentUser.uid,
            };

            usuarioLogadoJaCurtiuEssePost.get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (postJafoiCurtidoAlgumaVez === false) {
                  if (doc.data().usuarioQueCurtiu === usuarioLogado) {
                    postJafoiCurtidoAlgumaVez = true;
                    alert('post já foi curtido por você!');
                  }
                }
              });

              if (postJafoiCurtidoAlgumaVez === false) {
              // alert("like ");
                likeBtn.update({ likes: firebase.firestore.FieldValue.increment(1) });
                firebase.firestore().collection('posts').doc(closestIdLike).collection('TB_QUEM_CURTIU')
                  .add(usuarioQueCurtiu)
                  .then(() => {});
              }

            });
          }

          const closestExcluir = event.target.closest(btnExcluir);
          if (closestExcluir && feedArea.contains(closestExcluir)) {
            const closestIdPost = closestExcluir.parentNode.querySelector('.id-escondido').innerText;

            if (confirm('Tem certeza que deseja excluir esse post?')) {
              firebase.firestore().collection('posts').doc(closestIdPost).delete()
                .then(() => {
                });
              renderPage();
            }
          }
        }, false);

      });

    firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const cardsOk = adicionaPostATela(snapshot.docs);
          feedArea.innerHTML = cardsOk;
        }
        if (change.type === 'modified') {
          renderizarPosts(change.doc.data());
          
        }
        if (change.type === 'removed') {
          renderizarPosts(change.doc.data());
        }
      });
    });
  }
  renderizarPosts();

  function adicionaPostATela(data) {
    let cards = '';

    data.forEach((doc) => {
      const informacao = doc.data();
      const idPost = doc.id;
      let cardPost = '';

      if (informacao.uid === firebase.auth().currentUser.uid) {
        cardPost = `
      <div class="card-post">
      <div class="info-post">

        <h2 class="nome-usuario">${informacao.name}</h2>
        <div class="btn-edit-exclui">
        <button class="btn-editar" id="btnEditar">Editar</button>
        <button  class="btn-excluir" id="btnExcluirPost">X</button>
        </div>
      </div>
        <p class="texto-post" id="post">${informacao.post}</p>
        <textarea class="editar-post" id="textareaEditarPost">${informacao.post}</textarea>
        <button class="btn-salvar-editado" id="btnSalvarEdicao">salvar</button>
        <p class="id-escondido">${idPost}</p>
        <p class="uid-escondido">${informacao.uid}</p>
        <p class="mostra-like">${informacao.likes}</p>
      </div>
      `;
      } else {
        cardPost = `
      <div class="card-post">
        <h2 class="nome-usuario">${informacao.name}</h2>
        <p class="texto-post" id="post">${informacao.post}</p>
        <p class="id-escondido">${idPost}</p>
        <p class="uid-escondido">${informacao.uid}</p>
        <div>
          <p class="id-escondido">${idPost}</p>
          <button class="btnLike" id="btnLike" data-id =${informacao.uid}>Curtir</button>
          <p class="mostra-like">${informacao.likes}</p>
        </div>
      </div>
      `;
      }

      // !!!!!!!!!! USAR PARA A LÓGICA FUNCIONAR !!!!!!!!!!
      // if (informacao.uid === firebase.auth().currentUser.uid) {
      //   cardPost = `
      // <div class="card-post">
        
      //   <h2 class="nome-usuario">${informacao.name}</h2>
      //   <button class="btn-editar" id="btnEditar">Editar</button>
      //   <button  class="btn-excluir" id="btnExcluirPost">X</button>

      //   <p class="texto-post" id="post">${informacao.post}</p>
      //   <textarea class="editar-post" id="textareaEditarPost">${informacao.post}</textarea>
      //   <button class="btn-salvar-editado" id="btnSalvarEdicao">salvar</button>
      //   <p class="id-escondido">${idPost}</p>
      //   <p class="uid-escondido">${informacao.uid}</p>
      //   <p class="mostra-like">${informacao.likes}</p>
      // </div>
      // `;
      // } else {
      //   cardPost = `
      // <div class="card-post">
      //   <h2 class="nome-usuario">${informacao.name}</h2>
      //   <p class="texto-post" id="post">${informacao.post}</p>
      //   <p class="id-escondido">${idPost}</p>
      //   <p class="uid-escondido">${informacao.uid}</p>
      //   <div>
      //     <p class="id-escondido">${idPost}</p>
      //     <button class="btnLike" id="btnLike" data-id =${informacao.uid}>Curtir</button>
      //     <p class="mostra-like">${informacao.likes}</p>
      //   </div>
      // </div>
      // `;
      // }

      cards += cardPost;
    });

    return cards;
  }

  // firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot((snapshot) => {
  //   snapshot.docChanges().forEach((feed) => {
  //     if (feed.type === 'added') {
  //       adicionaPostATela(feed.doc.data(), feed.doc.id);
  //     }
  //   });
  // });

  const btnLogout = rootElement.querySelector('#btnLogout');
  btnLogout.addEventListener('click', logout);
  function logout() {
    firebase.auth().signOut().then(() => {
      window.location = '/';
    });
  }

  return rootElement;
};


