import { renderPage } from '../router.js';

export const createPostMaker = ({
  database,
}) => {
  const createPost = ({
    formEl,
  }) => {
    const textEl = formEl.querySelector('.post__textarea');

    const loadEvents = () => {
      formEl.addEventListener('submit', (event) => {
        event.preventDefault();
        if (textEl.value !== '') {
          return newPost({
            post: textEl.value,
            name: database.auth().currentUser.displayName,
            uid: database.auth().currentUser.uid,
            date: new Date(),
            likes: 0,
          });
        }
        return alert('Digite alguma coisa!');
      });
    };

    const newPost = ({
      post,
      name,
      uid,
      date,
      likes,
    }) => database
      .firestore()
      .collection('posts')
      .add({
        post,
        name,
        uid,
        date,
        likes,
      })
      .then(() => {
          renderPage();
      });

    const initialize = () => {
      loadEvents();
    };

    initialize();

    return {
      newPost,
    };
  };

  return createPost;
};

export const postTemplate = `
  <form class="post post-enviar" data-js-post>
    <textarea class="post__textarea" id="textoPost" placeholder="Conte sobre sua última cerveja..."></textarea>
    <button id="btnPost" class="post__button">Postar</button>
  </form>
`;
