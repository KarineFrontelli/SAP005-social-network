import {
  nomeUsuario,
  editPost,
  excluirPostBanco,
  likeFirebase,
  getAllPosts,
  logout,
} from '../../services/index.js';
import { createPostMaker, postTemplate } from '../../components/post.js';

export const Home = () => {
  const pageHome = `
    <section class="home">
      <header class="header">
        <h1 class="name-user" id="userName"></h1>
        <button id="btnLogout" class="btn-Logout">Sair</button>
      </header>
      <main class="main-home">
        <section>
        <h2 class="h2">Veja quais cervejas as pessoas andam bebendo:</h2>
        <button class="novo-post">Novo Post</button>
          ${postTemplate}
        </section>
        <section class="posts-enviados" id="feedArea">
        </section>
      </main>
    </section>
    `;

  const rootElement = document.createElement('div');
  rootElement.classList.add('root-div')
  rootElement.innerHTML = pageHome;


  nomeUsuario();

  const formEl = rootElement.querySelector('[data-js-post]');
  const feedArea = rootElement.querySelector('#feedArea');
  const btnLogout = rootElement.querySelector('#btnLogout');
  const titulo = rootElement.querySelector('.h2');
  const btnNovoPost = rootElement.querySelector('.novo-post');

  btnNovoPost.addEventListener('click', () => {
    formEl.style.display = "flex";
    titulo.style.display = "none";
    btnNovoPost.style.display = "none";
    document.documentElement.scrollTop = 0;
  })

  const createPost = createPostMaker({
    database: firebase,
  });

  const loadEvents = () => {
    btnLogout.addEventListener('click', logout);
  };

  function renderizarPosts() {
    getAllPosts().then((res) => {
      const cardsOk = adicionaPostATela(res);
      feedArea.innerHTML = cardsOk;
      const btnEditar = feedArea.querySelectorAll('.btn-editar');
      btnEditar.forEach((button) => {
        button.addEventListener('click', (e) => {
          mostrarAreaEditar(e);
        });
      });

      const mostrarAreaEditar = (e) => {
        const cadaPost = e.target.parentNode.parentNode.parentNode;
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
        const idPost = cadaPost.id;
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
        const cadaPost = e.target.parentNode.parentNode.parentNode.parentNode;
        console.log(cadaPost);
        const idPost = cadaPost.id;
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
        const cadaPost = e.target.parentNode.parentNode;
        const idPost = cadaPost.id;
        const btnLiked = cadaPost.querySelector('.btnLike');

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
                btnLiked.classList.add('btn-liked');
                btnLiked.innerHTML = "Curtiu!"
              }
            }
          });

          if (postJafoiCurtidoAlgumaVez === false) {
            likeFirebase(idPost)
              .then(() => {
                firebase.firestore().collection('posts').doc(idPost).collection('TB_QUEM_CURTIU')
                  .add(usuarioQueCurtiu)
                  .then(() => {
                    alert('Curtida contabilizada com sucesso!');
                    btnLiked.classList.add('btn-liked');
                    btnLiked.innerHTML = "Curtiu!"
                  });
              })
              .catch(() => {
                alert('Deu ruim aí');
              });
          }
        });
      };
      return res;
    });
  }

  function adicionaPostATela(data) {
    let cards = '';
    data.forEach((doc) => {
      const informacao = doc.data();
      const idPost = doc.id;
      let cardPost = '';
      function nome(str) {
        var arr = str.split(' ');
        if (arr[1] === 'de' || arr[1] === 'da' || arr[1] === 'do' || arr[1] === 'dos') {
          return arr[0] + " " + arr[1] + " " + arr[2]
        } else if (arr[1] === '') {
          return arr[1].replace('undefined', '')
        } else {
          return arr[0] + " " + arr[1]
        }

        
      }
      // const nome = informacao.name;
      // const primeiroNome = nome.split(' ')[0] + " " + nome.split(' ')[1];
      if (informacao.uid === firebase.auth().currentUser.uid) {
        cardPost = `
            <div class="card-post" id="${idPost}">
              <div class="info-post">
                <h2 class="nome-usuario">${nome(informacao.name).replace('undefined', '')}</h2>
                <div class="btn-edit-exc">
                  <button class="btn-editar" id="btnEditar">Editar</button>
                  <button  class="btn-excluir" id="btnExcluirPost">
                  <img class='btn-excluir' src="img/delete.svg" alt="Delete icon">
                  </button>
                </div>
              </div>
      
              <p class="texto-post" id="post">${informacao.post}</p>
              <div class="area-editar">
                <textarea class="editar-post" id="textareaEditarPost">${informacao.post}</textarea>
                <button class="btn-salvar-editado" id="btnSalvarEdicao">Salvar</button>
              </div>
              <p class="mostra-like">${informacao.likes}</p>
            </div>
            `;
      } else {
        cardPost = `
            <div class="card-post" id=${idPost}>
              <h2 class="nome-usuario">${nome(informacao.name).replace('undefined', '')}</h2>
              <p class="texto-post" id="post">${informacao.post}</p>
              <div>
                <button class="btnLike" id="btnLike">Curtir</button>
                <p class="mostra-like">${informacao.likes}</p>
              </div>
            </div>
            `;
      }

      cards += cardPost;
    });
    return cards;
  }

  const initialize = () => {
    loadEvents();
    createPost({
      formEl,
    });
    renderizarPosts();
    logout;
  };

  initialize();

  return rootElement;
};
