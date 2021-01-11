// import { renderPage } from '../../router.js';
import { nomeUsuario, editPost } from '../../services/index.js';
import { createPostMaker, postTemplate } from './post.js';

// import { nomeUsuario } from './data.js';

export const Home = () => {
  // Coloque sua página
  const pageHome = `
      <header>
        <h1 class="name-user" id="userName"></h1>
        <button class="btn-Logout" id="btnLogout">Sair</button>
      </header>
      <main class="main-home">
        <section>
          ${postTemplate}
        </section>
        <section class="posts-enviados" id="feedArea">
        </section>
      </main>
    `;

  const rootElement = document.createElement('div');
  rootElement.innerHTML = pageHome;

  nomeUsuario();

  const formEl = rootElement.querySelector('[data-js-post]');
  const feedArea = rootElement.querySelector('#feedArea');
  const btnLogout = rootElement.querySelector('#btnLogout');

  const createPost = createPostMaker({
    database: firebase,
  });

  const loadEvents = () => {
    btnLogout.addEventListener('click', logout);
  };

  function logout() {
    firebase.auth().signOut().then(() => {
      window.location = '/';
    });
  }

  // btnPost.addEventListener('click', () => {
  //   const post = criarPost();
  //   criarBanco(post);
  //   renderPage();
  // } );

  function renderizarPosts() {
    firebase.firestore().collection('posts').orderBy('date', 'desc').get()
      .then((snapshot) => {
        const cardsOk = adicionaPostATela(snapshot.docs);
        feedArea.innerHTML = cardsOk;

        const btnEditar = feedArea.querySelectorAll('.btn-editar');

        btnEditar.forEach((button) => {
          button.addEventListener('click', (e) => {
            mostrarAreaEditar(e);
          });
        });

        const mostrarAreaEditar = (e) => {
          const cadaPost = e.target.parentNode;
          const areaEditar = cadaPost.querySelector('.area-editar');
          areaEditar.style.display = 'block';

          const btnEnviarComent = cadaPost.querySelector('.btn-salvar-editado');

          btnEnviarComent.addEventListener('click', () => {
            sendPost(cadaPost);
          });
        };

        const sendPost = (cadaPost) => {
          const areaEditar = cadaPost.querySelector('.area-editar');
          const textareaPost = cadaPost.querySelector('.editar-post');
          const textoPost = cadaPost.querySelector('.texto-post');
          const idPost = cadaPost.querySelector('.id-escondido').innerText;
          const novoTexto = textareaPost.value;

          editPost(idPost, novoTexto)
            .then(() => {
              textoPost.innerHTML = textareaPost.value;
              areaEditar.style.display = "none";
            })
            .catch(() => {
              alert('Deu ruim aí');
            });
        };

        // feedArea.addEventListener('click', (event) => {
        //   const closestLike = event.target.closest(btnLike);
        //   if (closestLike && feedArea.contains(closestLike)) {
        //     const closestIdLike = closestLike.parentNode.querySelector('.id-escondido').innerText;

        //     const likeBtn = firebase.firestore().collection('posts').doc(closestIdLike);

        //     let postJafoiCurtidoAlgumaVez = false;
        //     const usuarioLogado = firebase.auth().currentUser.uid;
        //     const usuarioLogadoJaCurtiuEssePost = firebase.firestore().collection('posts')
        //       .doc(closestIdLike).collection('TB_QUEM_CURTIU');
        //     const usuarioQueCurtiu = {
        //       usuarioQueCurtiu: firebase.auth().currentUser.uid,
        //     };

        //     usuarioLogadoJaCurtiuEssePost.get().then((querySnapshot) => {
        //       querySnapshot.forEach((doc) => {
        //         if (postJafoiCurtidoAlgumaVez === false) {
        //           if (doc.data().usuarioQueCurtiu === usuarioLogado) {
        //             postJafoiCurtidoAlgumaVez = true;
        //             alert('post já foi curtido por você!');
        //           }
        //           // renderPage();
        //         }
        //       });

        //       if (postJafoiCurtidoAlgumaVez === false) {
        //         likeBtn.update({ likes: firebase.firestore.FieldValue.increment(1) });
        //         firebase.firestore().collection('posts').doc(closestIdLike).collection('TB_QUEM_CURTIU')
        //           .add(usuarioQueCurtiu)
        //           .then(() => { });
        //         // renderPage();
        //       }
        //     });
        //   }

        //   const closestExcluir = event.target.closest(btnExcluir);
        //   if (closestExcluir && feedArea.contains(closestExcluir)) {
        //     const closestIdPost = closestExcluir.parentNode.querySelector('.id-escondido').innerText;

        //     if (confirm('Tem certeza que deseja excluir esse post?')) {
        //       firebase.firestore().collection('posts').doc(closestIdPost).delete()
        //         .then(() => {
        //         });
        //       // renderPage();
        //     }
        //   }
        // }, false);
      });

    // firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot((snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === 'added') {
    //       const cardsOk = adicionaPostATela(snapshot.docs);
    //       feedArea.innerHTML = cardsOk;
    //     }
    //     if (change.type === 'modified') {
    //       renderizarPosts(change.doc.data());
    //     }
    //     if (change.type === 'removed') {
    //       renderizarPosts(change.doc.data());
    //     }
    //   });
    // });
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
      <div class="card-post" data-id=${idPost}>
        
        <h2 class="nome-usuario">${informacao.name}</h2>
        <button class="btn-editar" id="btnEditar">Editar</button>
        <button  class="btn-excluir" id="btnExcluirPost">X</button>

        <p class="texto-post" id="post">${informacao.post}</p>
        <div class="area-editar">
          <textarea class="editar-post" id="textareaEditarPost">${informacao.post}</textarea>
          <button class="btn-salvar-editado" id="btnSalvarEdicao">salvar</button>
        </div>
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

  const initialize = () => {
    loadEvents();
    createPost({
      formEl,
    });
  };

  initialize();

  return rootElement;
};

// switch(postJafoiCurtidoAlgumaVez === false) {
//   case(doc.data().usuarioQueCurtiu === usuarioLogado):
//     postJafoiCurtidoAlgumaVez = true;
//     alert('post já foi curtido por você!');
//     break;
//   case (postJafoiCurtidoAlgumaVez === false):
//     likeBtn.update({ likes: firebase.firestore.FieldValue.increment(1) });
//     firebase.firestore().collection('posts').doc(closestIdLike).collection('TB_QUEM_CURTIU')
//       .add(usuarioQueCurtiu)
//       .then(() => { });
//       break;
// }
