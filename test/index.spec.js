import * as services from '../src/services/index.js';
import { Login } from '../src/pages/login/index.js';
import { renderPage } from '../src/router.js';
// import { Home } from '../src/pages/home/index.js';

services.likeFirebase = jest.fn(() => Promise.resolve(true));
services.editPost = jest.fn(() => Promise.resolve(true));
services.excluirPostBanco = jest.fn(() => Promise.resolve(true));
services.Google = jest.fn(() => Promise.resolve(true));
services.Facebook = jest.fn(() => Promise.resolve(true));

describe('Render página de login', () => {
  it('carrega a página', () => {
    expect(Login()).toMatchSnapshot();
  });

  it('click no botão de login com o Google', () => {
    const pagLogin = Login();
    pagLogin.querySelector('#btnGoogle').dispatchEvent(new Event('click'));
    expect(services.Google).toHaveBeenCalled();
  });

  it('click no botão de login com o Facebook', () => {
    const pagLogin = Login();
    pagLogin.querySelector('#btnFacebook').dispatchEvent(new Event('click'));
    expect(services.Facebook).toHaveBeenCalled();
  });
});

describe('Testar renderPage', () => {
  it('é uma função', () => {
    expect(typeof renderPage).toBe('function');
  });
});

describe('Testar login', () => {
  it('é uma função', () => {
    expect(typeof Login).toBe('function');
  });
});

describe('Testar like', () => {
  it('é uma função', () => {
    expect(typeof services.likeFirebase).toBe('function');
  });
});

describe('Testar edit', () => {
  it('é uma função', () => {
    expect(typeof services.editPost).toBe('function');
  });
});

describe('Testar excluir', () => {
  it('é uma função', () => {
    expect(typeof services.excluirPostBanco).toBe('function');
  });
});
