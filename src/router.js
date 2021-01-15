// Este é seu ponto de entrada da sua aplicação
import { Home } from './pages/home/index.js';
import { Login } from './pages/login/index.js';
import { Cadastro } from './pages/cadastro/index.js';
import { ValidacaoIdade } from './pages/confirmacao/index.js';

const routes = {
  '/home': Home,
  '/login': Login,
  '/cadastro': Cadastro,
  '/' : ValidacaoIdade,
};

const container = document.querySelector('#root');
const validateHash = (hash) => (hash === '' ? '/' : hash.replace('#', ''));

export const renderPage = () => {
  const page = validateHash(window.location.pathname);
  container.innerHTML = '';
  container.appendChild(routes[page]());
};

const init = () => window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  renderPage();
  init();
});

window.addEventListener('popstate', renderPage);
