import { renderPage } from '../../router.js';

// import { nomeUsuario } from './data.js';

export const Home = () => {
  // Coloque sua página
  const pageHome = `
      <header>
      <button class="btn-Logout" id="btnLogout">Sair</button>
        <h1 class="name-user" id="userName"></h1>
      </header>
      <main class="main-home">
        <section class="post-enviar">
          <textarea class="post" id="textoPost" placeholder="Conte sobre sua última cerveja..."></textarea>
          <button id="btnPost">Postar</button>
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
    firebase.firestore().collection('posts').orderBy('date', 'desc').get().then((snapshot) => {
      const cardsOk = adicionaPostATela(snapshot.docs);

      feedArea.innerHTML = cardsOk;

      // ------ ADICIONAR UM EVENTO À feedArea para gerar o if de autenticação -----------------------------

      // const closestUid = feedArea.querySelector(".uid-escondido").innerText;
      // if(closestUid === firebase.auth().currentUser.uid) {
      //   console.log(closestUid)
      //   feedArea.querySelectorAll(".btn-editar").style.display = "block"
      // }
      const closestUid = feedArea.querySelector(".uid-escondido");
      // const cadaUid = closestUid.innerText
      // cadaUid.forEach(function(cardsOk) {
        console.log(closestUid.innerHTML)
      // })

      console.log(firebase.auth().currentUser.uid)

      if(closestUid.innerText === firebase.auth().currentUser.uid){
        console.log("It's me, Maaario")
        const btnbtn = feedArea.querySelector(".btn-editar");
        // btnbtn.classList.remove("btn-editar");
        // btnbtn.classList.add("btn-block");
        console.log(btnbtn)
      }

      if(closestUid.innerText != firebase.auth().currentUser.uid){
        console.log("Not today, Satan!")
      }
      
      // for(let uids in cardsOk) {
      //   uids = closestUid.innerText;
      //   console.log(uids)
      // }

      const btnEditar = ".btn-editar";
      const btnExcluir = ".btn-excluir";

      feedArea.addEventListener("click", function (event) {
        let closestEditar = event.target.closest(btnEditar);
        if (closestEditar && feedArea.contains(closestEditar)) {
          console.log("botão editar ok")

          const closestTextarea = closestEditar.parentNode.querySelector(".editar-post");
          closestTextarea.style.display = "block"
          console.log(closestTextarea)
          const closestBtnSalvarEdicao = closestEditar.parentNode.querySelector(".btn-salvar-editado");
          closestBtnSalvarEdicao.style.display = "block"

          closestBtnSalvarEdicao.addEventListener("click", function (event) {
            console.log("botão salvar ok")
            closestTextarea.style.display = "none"
            closestBtnSalvarEdicao.style.display = "none"
            const closestPost = closestEditar.parentNode.querySelector(".texto-post");
            const postFinal = closestTextarea.value;
            closestPost.innerHTML = postFinal;
            const closestId = closestEditar.parentNode.querySelector(".id-escondido").innerText;
            console.log(closestId)

            firebase.firestore().collection('posts').doc(closestId).update({
              like: postFinal
            }).then(() => {
              closestPost.innerHTML = postFinal;
              console.log("Document successfully updated!");
            });

          })
        }

        let cosestExcluir = event.target.closest(btnExcluir);
        if (cosestExcluir && feedArea.contains(cosestExcluir)) {
          console.log("botão excluir ok")

          const closestIdPost = cosestExcluir.parentNode.querySelector(".id-escondido").innerText;
          console.log(closestIdPost)

          if (confirm("Tem certeza que deseja excluir esse post?")) {
            firebase.firestore().collection('posts').doc(closestIdPost).delete().then(() => {
              console.log("Document successfully deleted!");
            });
            renderPage();
          }
        }
      })

    })

    firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const cardsOk = adicionaPostATela(snapshot.docs);
          feedArea.innerHTML = cardsOk;
        }
        if (change.type === "modified") {
          console.log("post: ", change.doc.data());
          renderizarPosts(change.doc.data())
        }
        if (change.type === "removed") {
          console.log("Removed post: ", change.doc.data());
          renderizarPosts(change.doc.data())
        }
      });
    });
  }
  renderizarPosts()

  function adicionaPostATela(data) {
    let cards = "";

    data.forEach(doc => {
      const informacao = doc.data();
      const idPost = doc.id;
      let cardPost = "";
      if (informacao.uid === firebase.auth().currentUser.uid) {
        cardPost = `
      <div class="card-post">
        <h2 class="nome-usuario">${informacao.name}</h2>
        <button class="btn-editar" id="btnEditar">editar post</button>
        <button  class="btn-excluir" id="btnExcluirPost">excluir post</button>
        <p class="texto-post" id="post">${informacao.post}</p>
        <textarea class="editar-post" id="textareaEditarPost">${informacao.post}</textarea>
        <button class="btn-salvar-editado" id="btnSalvarEdicao">salvar</button>
        <p class="id-escondido">${idPost}</p>
        <p class="uid-escondido">${informacao.uid}</p>

      </div>
      `
      } else {
        cardPost = `
      <div class="card-post">
        <h2 class="nome-usuario">${informacao.name}</h2>
        <p class="texto-post" id="post">${informacao.post}</p>
        <p class="id-escondido">${idPost}</p>
        <p class="uid-escondido">${informacao.uid}</p>
        <div>
          <button class="btnLike" id="btnLike" data-id =${informacao.uid}>curtir</button>
        </div>
      </div>
      `
      }

      

      cards += cardPost;
    });

    return cards;

    // const likeBtn = document.querySelector("#btnLike");
    //   likeBtn.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     console.log("eai")
    //     likePost();
    //   })

    // function likePost(uid) {
    //   const like = firebase.firestore().collection('posts').doc(uid);
    //   like.update({ likes: firebase.firestore.FieldValue.increment(1) });
    //   console.log(uid);

    //   console.log('oi');

    // }

  }

  // firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot((snapshot) => {
  //   snapshot.docChanges().forEach((feed) => {
  //     if (feed.type === 'added') {
  //       adicionaPostATela(feed.doc.data(), feed.doc.id);
  //     }
  //   });
  // });

  const btnLogout = rootElement.querySelector('#btnLogout');

  function logout() {
    // console.log("sextou bb")
    firebase.auth().signOut().then(() => {
      // console.log("Sessão Encerrada!!")
      window.location = '/';
    });
  }

  btnLogout.addEventListener('click', logout);

  return rootElement;
};