// import { renderPage } from '../../router.js';
import {
  nomeUsuario,
  editPost,
  excluirPostBanco,
  likeFirebase,
  getAllPosts
} from '../../services/index.js';
import { createPostMaker, postTemplate } from '../../components/post.js';

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

  function renderizarPosts() {
    const x = getAllPosts().then((res) => {
      console.log(res);
      return res
    });
    // firebase.firestore().collection('posts').orderBy('date', 'desc').get()
    //   .then((snapshot) => {
        const cardsOk = adicionaPostATela(x);
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
              areaEditar.style.display = 'none';
            })
            .catch(() => {
              alert('Deu ruim aí');
            });
        };

        const btnExcluir = feedArea.querySelectorAll('.btn-excluir');
        btnExcluir.forEach((button) => {
          button.addEventListener('click', (e) => {
            excluirPost(e);
          });
        });

        const excluirPost = (e) => {
          const cadaPost = e.target.parentNode;
          const idPost = cadaPost.querySelector('.id-escondido').innerText;
          if (confirm('Tem certeza que deseja excluir esse post?')) {
            excluirPostBanco(idPost)
              .then(() => {
                cadaPost.style.display = 'none';
              })
              .catch(() => {
                alert('Deu ruim aí');
              });
          }
        };

        const btnLike = feedArea.querySelectorAll('.btnLike');
        btnLike.forEach((button) => {
          button.addEventListener('click', (e) => {
            contarLike(e);
          });
        });

        const contarLike = (e) => {
          const cadaPost = e.target.parentNode;
          const idPost = cadaPost.querySelector('.id-escondido').innerText;

          let postJafoiCurtidoAlgumaVez = false;

          const usuarioLogadoJaCurtiuEssePost = firebase.firestore().collection('posts')
            .doc(idPost).collection('TB_QUEM_CURTIU');

          const usuarioLogado = firebase.auth().currentUser.uid;

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
              likeFirebase(idPost)
                .then(() => {
                  firebase.firestore().collection('posts').doc(idPost).collection('TB_QUEM_CURTIU')
                    .add(usuarioQueCurtiu)
                    .then(() => {});
                })
                .catch(() => {
                  alert('Deu ruim aí');
                });
            }
          });
        };
      // });
  }


    function adicionaPostATela(data) {
      // setTimeout(() => console.log(data), 5000)
  
      // function banana() {
      //   console.log(data);
      // }
  
      // setTimeout(() => { 
        let cards = '';
        const y = (data) => {
          data.then((res) => {
            console.log(res)
            return res
          }) 
        } 
        console.log(y(data))
        console.log(data)
        data.forEach((doc) => {
        const informacao = doc.data();
        const idPost = doc.id;
        let cardPost = '';
        if (informacao.uid === firebase.auth().currentUser.uid) {
          cardPost = `
        <div class="card-post ${idPost}" data-id="${idPost}">
          
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
        <div class="card-post ${idPost}" data-id=${idPost}>
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
    // }, 5000)
    }
  

  const initialize = () => {
    loadEvents();
    createPost({
      formEl,
    });
    renderizarPosts();
  };

  initialize();

  return rootElement;
};
