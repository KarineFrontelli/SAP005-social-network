import { Conta } from '../../services/index.js';
import { renderPage } from '../../router.js';

export const Cadastro = () => {
  const pageCadastro = `
    <section class="form">
    
    

      <form class="cadastro">
      <div class="logo">
        <img class="img-logo"  src="../img/Logo.jpeg" alt="logo da  página">
      </div>
      <div class="login-opcoes">

        <div>
          <input class="input-login" "type="text" id="inputName" placeholder="Nome *"/>
        </div>
        <div>
          <input class="input-login" type="email" id="inputEmail" placeholder="Email * (ex: email@email.com.br)"/>
        </div>
        <div>
          <input class="input-login" type="password" id="inputSenha"  placeholder="Senha * (mínimo 6 caracteres)"/>
        </div>
          <button class="link criar-Conta" id="criarConta"> Criar Conta </button>
      </div>
      </form>
    </section>
    <footer>Developed by @<a href="https://github.com/biacostadev">Bia</a>, @<a href="https://github.com/julianaads">Juliana</a> e @<a href="https://github.com/KarineFrontelli">Karine</a></footer>
  `;

  const rootElement = document.createElement('div');
  rootElement.innerHTML = pageCadastro;

  const criarConta = rootElement.querySelector('#criarConta');

  criarConta.addEventListener('click', (event) => {
    event.preventDefault();

    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;
    Conta(email, senha, name);
    if (name === '' || email === '' || senha === '') {
      alert('Por favor preencha os campos obrigatórios');
    } else {
      alert('Usuario criado com sucesso, faça o login');
      window.history.pushState(null, null, '/');
      renderPage();
    }
  });

  return rootElement;
};
