import { createPostMaker, postTemplate } from '../src/components/post.js';
import { parse } from '../src/utils/index.js';

const databaseMock = {
  store: {},
  currentCollection: '',
  firestore() {
    return this;
  },
  collection(collectionName) {
    this.currentCollection = collectionName;
    return this;
  },
  add(item) {
    return new Promise((resolve) => {
      if (!this.store[this.currentCollection]) {
        this.store[this.currentCollection] = [item];
      }

      this.store[this.currentCollection].push(item);

      resolve();
    });
  },
  auth() {
    return {
      currentUser: {
        displayName: 'Bia',
        uid: '1232456897463468',
      },
    };
  },
};

const formEl = parse(postTemplate);
const createPost = createPostMaker({
  database: databaseMock,
});

const post = createPost({
  formEl,
});

describe('criando o post', () => {
  it('carrega a página', () => {
    expect(formEl).toBeDefined();
  });

  it('deve criar um novo post', () => {
    const expected = {
      post: 'teste',
      name: databaseMock.auth().currentUser.displayName,
      uid: databaseMock.auth().currentUser.uid,
      date: new Date(),
      likes: 0,
    };
    post.newPost(expected);
    expect(databaseMock.store.posts[0]).toEqual(expected);
  });
});
