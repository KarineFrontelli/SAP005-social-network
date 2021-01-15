Para acessar a página [clique aqui](https://rede-social-51f01.web.app/).. 💻

<p align="center">
<img src="/src/img/Logo.jpeg" width="300" heigth="300" >
</p>

## Índice

- [1. Introdução](#1-introdução)
- [2. Apresentação](#2-apresentação)
- [3. Planejamento e Desenvolvimento](#3-planejamento-e-desenvolvimento)
- [4. Considerações gerais](#4-considerações-gerais)
- [5. Critérios de aceitação mínimos do
  projeto](#5-critérios-de-aceitação-mínimos-do-projeto)

## 1. Introdução

  Não é segredo pra ninguém que as Redes Sociais tem um lugarzinho só delas em nossos corações, umas mais outras menos mas a questão é que hoje em dia ninguém vive sem dar uma espiadinha nas redes, seja para postar foto de uma viagem, o Meme do momento ou como meio de manter-se atualizado em um ou diversos assuntos ao mesmo tempo. De acordo com a revista época [o Brasil ocupa o 2º lugar dos países que passam mais tempo conectados em redes sociais](https://epocanegocios.globo.com/Tecnologia/noticia/2019/09/brasil-e-2-em-ranking-de-paises-que-passam-mais-tempo-em-redes-sociais.html).  
  Por este motivo a Laboratória nos propos o desenvolvimento de uma Rede Social abordando um tema que fosse relevante para nosso estilo de vida. Foi ai que nasceu LaBeer.


## 2. Apresentação

  LaBeer é um Rede Social voltada para o entretenimento e troca de experiencias entre apreciadores de cerveja. Através da aplicação é possível deixar sua opinião sobre marcas, sabores, preços e uma ótima oportunidade para ampliar seu círculo social conhecendo novas pessoas com interesses parecidos com o seu.


## 3. Planejamento e Desenvolvimento

  Iniciamos o processo de desenvolvimento fazendo uma pesquisa com possíveis usuários, onde detectamos as principais necessidades de funcionalidades do produto.A pesquisa obteve 98 respostas dentre os resultados obtivemos os seguintes dados:
  
 ✔️ 88,5% dos participantes utilizariam uma rede social voltada para o público cervejeiro
 
 <p align="center">
<img src="/src/img/vc acessaria a Rede.jpeg" width="350" heigth="350" >
</p>
 
 
✔️ 100% dos participantes contumam acessar as redes sociais pelo celular e desses 100% 32,5% também utilizam desktop  
 <p align="center">
<img src="/src/img/como acessa.jpeg" width="400" heigth="400" >
</p>


 ✔️  32,5% Criariam um novo usuário cadastrando e-mail e senha;
 ✔️  61% dos participates costumam fazer login com goole;
 ✔️ 58,4% utilizam login com o facebook
  <p align="center">
<img src="/src/img/login.jpeg" width="350" heigth="350" >
</p> 
 

  
  
  
  
  
  
  

## 4. Protótipo

A partir do resultado da pesquisa criamos o protótipo da aplicação

## Tela mobile

<p align="center">
<img src="/src/img/login mobile.jpeg" width="350" heigth="350" >
</p> 

<p align="center">
<img src="/src/img/cadastro mobile.jpeg" width="350" heigth="350" >
</p> 

 <p align="center">
<img src="/src/img/Feed mobile.jpeg" width="350" heigth="350" >
</p> 

 <p align="center">
<img src="/src/img/feed mobile2.jpeg" width="350" heigth="350" >
</p> 

 <p align="center">
<img src="/src/img/feed mobile2.jpeg" width="350" heigth="350" >
</p> 











## 5. Critérios de aceitação mínimos do projeto

### 5.1 Boilerplate

O _boilerplate_ contém uma estrutura de arquivos como ponto de partida, assim
como toda a configuração de dependências:

```text
.
├── src
|  ├── pages (páginas)
|  |  └── home
|  |  |  ├── index.js
|  |  |  └── index.spec.js
|  |  └── login
|  |     ├── index.js
|  |     └── index.spec.js
|  ├── services (serviços externos)
|  |  ├── index.js
|  |  └── index.spec.js
|  ├── utils
|  |  └── history.js
|  ├── index.html
|  ├── router.js
|  └── style.css
├── README.md
└── package.json

```

### `src/index.html`

O arquivo `index.html` é a página que vai ser exibida ao usuário.

### `src/router.js`

O script de `index.html` aponta para este arquivo `router.js`, que cuida de direcionar as rotas da aplicação sem a necessidade de um novo carregamento da página.

Temos a importação das páginas `Home` e `Login` como exemplo, e também da função `onNavigate` que registra cada tela adicionada ao histórico de navegação.

A função `renderRouter` presente neste arquivo é responsável por renderizar as página da aplicação (`Home` e `Login`) e é acionada em dois momentos distintos:

- [load](https://developer.mozilla.org/pt-BR/docs/Web/Events/load): quando há o carregamento inicial da página. Ex: ao acessar `localhost:5000` a página `Home` é renderizada dentro da `div#root` dentro do `index.html`, ou

- [popstate](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/popstate_event): quando há o carregamento da página já contendo a rota desejada. Ex: ao acessar `localhost:5000/login` a página `Login` é renderizada dentro da `div#root` dentro do `index.html`.

A função `onNavigate()` está sendo disparada quando há um `click` em qualquer uma das rotas presentes nesse boilerplate.

### `src/utils/history.js`

Este arquivo contém a função `onNavigate()`, que recebe como parâmetro `path` e `state`, que são armazenados no histórico do navegador. Dessa forma, mesmo sem recarregar a página (por ser SPA), se torna possível navegar entre todas páginas renderizadas por meio do botão de `back` e `forward` do navegador. [History API](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API)

### `src/services/index.js`

A manipulação de dados dependerá do servidor externo Firebase.

Recomendamos que este arquivo contenha todas as funcionalidades (suas funções) que correspondam a qualquer manipulação de dados (criar, ler, atualizar, deletar).

### `src/pages`

Neste diretório estão as pastas `home` e `login`, e cada uma delas contém um arquivo `index.js`. Sugerimos que o conteúdo de cada página fique separado de acordo com o exemplo proposto, em forma de funções que retornam o conteúdo `HTML` desejado. Dessa maneira, a responsabilidade de cada página fica isolada.

### `src/**/**/*.spec.js`

Todos os arquivos com terminação `.spec.js` são lidos e executados com o comando `npm run test`. Como temos diversas funcionalidades distribuídas na aplicação, optamos por deixar os arquivos de teste próximos às funcionalidades testadas.

### 5.2 Definição do produto

No `README.md`, conte-nos brevemente como você mapeou as necessidades dos seus
usuários e como você chegou à definição final do seu produto. É importante que
detalhe:

- Quem são os principais usuários do produto.
- Qual problema o produto resolve/para que ele serve para esses usuários.

### 5.3 Histórias de usuário

Depois de entender as necessidades de seus usuários, escreva as Histórias de
Usuário. Elas representam tudo o que ele precisa fazer/ver na Rede Social. Cada
uma de suas histórias de usuário deve possuir:

- **Critérios de aceitação:** tudo o que deve acontecer para satisfazer as
  necessidades do usuário.

- **Definição de pronto:** todos os aspectos técnicos que devem ser atendidos
  para que, como equipe, saibam que essa história está finalizada e pronta para
  ser publicada. **Todas** suas histórias de usuário (com exceções), devem
  incluir esses aspectos em sua definição de pronto (além de tudo o que precisa
  adicionar):

  - Ser uma SPA.
  - Ser _responsivo_.
  - Receber _code review_ de pelo menos uma parceira de sua equipe.
  - Fazer _tests_ unitários.
  - Fazer testes manuais buscando erros e imperfeições simples.
  - Fazer testes de usabilidade e incorporar o _feedback_ dos usuários como
    melhorias.

### 5.4 Desenho da Interface de Usuário (protótipo de baixa fidelidade)

Você deve definir qual será o fluxo que o usuário seguirá dentro do seu
aplicativo e, com isso, criar a interface do usuário (UI) que siga este fluxo.

### 5.5 Responsivo

Deve funcionar bem em dispositivos de tela grande (computadores, laptops etc.) e
pequena (_tablets_, telefones celulares etc.). Sugerimos seguir a técnica
_`mobile first`_ (mais detalhes sobre essa técnica ao final).

### 5.6 Considerações sobre o comportamento da Interface do Usuário (UI)

Essas considerações ajudarão você a escrever as definições de pronto de sua
H.U.:

#### Criação e login de conta de usuário

- _Login_ com Firebase:
  - Para o _login_ e postagens na timeline, você pode usar
    [Firebase Authentication](https://firebase.google.com/docs/auth) e [Cloud Firestore](https://firebase.google.com/docs/firestore)
  - O usuário deve poder criar uma conta de acesso ou autenticar-se com conta de
    e-mail e senha e também com uma conta do Google.
- Validações:
  - Somente usuários com contas válidas têm acesso permitido.
  - Não haver usuários repetidos.
  - A conta do usuário deve ser um email válido.
  - O que o usuário digita no campo de senha (_input_) deve ser secreto.
- Comportamento:
  - Quando o formulário de registro ou login é enviado, ele deve ser validado.
  - Se houver erros, mensagens descritivas devem ser exibidas para ajudar o
    usuário.

#### Timeline/linha do tempo

- Validações:
  - Ao publicar, deve ser validado se há conteúdo no _input_.
- Comportamento:
  - Ao recarregar o aplicativo, é necessário verificar se o usuário está
    _logado_ antes de exibir o conteúdo,
  - Conseguir publicar um _post_.
  - Poder dar e remover _likes_ em uma publicação. Máximo de um por usuário.
  - Visualizar contagem de _likes_.
  - Poder excluir uma postagem específica.
  - Solicitar confirmação antes de excluir um _post_.
  - Ao clicar em editar um _post_, você deve alterar o texto para um _input_ que
    permite editar o texto e salvar as alterações.
  - Ao salvar as alterações, você deve voltar ao texto normal, mas com a
    informação editada.
  - Ao recarregar a página, poder ver os textos editados.

### 5.7 Considerações técnicas sobre front-end

- Separar a manipulação do DOM da lógica (separação de responsabilidades).
- Ter várias telas. Para isso, seu aplicativo deve ser um [Single Page
  Application
  (SPA)](https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica)
- Alterar e persistir dados. Os dados que você adiciona ou modifica devem
  persistir por todo o aplicativo. Recomendamos que você use o
  [Firebase](https://firebase.google.com/) para isso também.

#### Testes unitários

- Lembre-se de que não há _setup_ de **testes** definido, isso dependerá da
  estrutura do seu projeto. Você não deve esquecer de pensar sobre os testes.
  Eles podem ajudar a definir a estrutura e sua lógica.

- Os testes de unidade devem cobrir no mínimo 70% de _statements_, _functions_,
  _lines_ e _branches_.

### 5.8 Considerações técnicas UX

- Faça pelo menos 2 entrevistas com os usuários.
- Faça um protótipo de baixa fidelidade.
- Verifique se a implementação do código segue as diretrizes do protótipo.
- Faça sessões de teste de usabilidade com o produto em HTML.

## 6. Hacker Edition

As seções chamadas _Hacker Edition_ são **opcionais**. Se **você terminou** e
cumpriu todos os requisitos acima e sobrou tempo, tente concluí-las. Dessa
forma, você pode aprofundar e/ou exercitar mais os objetivos de aprendizagem do
projeto.

- Criar posts com imagens.
- Procurar usuários, adicionar e excluir "amigos".
- Definir a privacidade de _posts_ (público ou apenas para amigos).
- Permitir ver na linha do tempo de usuários "não amigos" apenas os posts
  públicos.
- Permitir comentar ou responder a uma postagem.
- Editar perfil.

## 7. Entrega

O projeto será entregue subindo seu código no GitHub (`commit` /`push`) e a
interface será hospedada usando o [Firebase Hosting](https://firebase.google.com/docs/hosting).

---

## 8. Guias, dicas e leituras complementares

### Primeiros passos

Para começar, você precisará criar um _fork_ e _clone_ deste repositório.

### Instalação de Firebase

Este projeto está configurado para rodar por meio do servidor do Firebase. Para isso, será necessário possuir o [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) instalado globalmente em sua máquina. Utilize o comando `npm install -g firebase-tools`

Inicie um novo projeto web no [console do Firebase](https://console.firebase.google.com/) (pode desabilitar o analytics).

Caso apareça a opção de habilitar o Hosting na tela seguinte, selecionar.

Clique no menu lateral `Cloud Firestore` para criar uma nova database como `production mode` e escolher a região `us-east1`.

**IMPORTANTE** rodar todos os comandos do Firebase no terminal a partir da pasta raiz do projeto.

Executar o comando `firebase login` e realizar o [login](https://firebase.google.com/docs/cli#sign-in-test-cli) por meio de uma conta Google - deve abrir uma janela automaticamente, se não abrir pode clicar no link que vai aparecer no console.

Executar o comando `firebase init` para iniciar o setup do projeto.

Selecionar Hosting (aperte espaço para selecionar essa opção e depois enter).

Selecionar `Use an existing project` (o terminal vai mostrar o nome do projeto que você acabou de criar no site do Firebase).

Escrever `src` para definir como `public directory` (o padrão vai estar como `public`).

Escrever `y` para selecionar como SPA.

Escrever `N` para não fazer builds e deploys automáticos com GitHub.

O Firebase vai dizer que `src/index.html` já existe e pergunta se quer sobrescrever. Nesse momento não tem problema fazer isso, ele vai sobrescrever o que veio no boilerplate da Lab com uma página padrão do Firebase. Sugerimos dar `N`, para não sobrescrever o `index.html`.

Se der tudo certo, o Firebase vai criar o arquivo `.firebaserc` de configuração na pasta do projeto e estamos prontas pra continuar.

Instale as dependências do projeto rodando o comando `npm install`.

Para iniciar sua aplicação web, use o comando `npm start` que usamos nos projetos anteriores. Com esse comando, você deve ver em `http://localhost:5000` uma página padrão do Firebase, que está sendo renderizada de `src/index.html`.

### Mobile first

O conceito de [_mobile
first_](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/) faz
referência a um processo de desenho e desenvolvimento que parte de como se vê e
como funciona uma aplicação primeiro em um dispositivo móvel e mais adiante se
analisa como adaptar a aplicação à telas progressivamente maiores. Esta é uma
contraposição ao modelo tradicional, no qual primeiro se desenha os websites (ou
webapps) para desktops e depois os adaptam para telas menores.

A motivação aqui é se assegurar que desde o começo sejam desenhadas telas
_responsivas_. Dessa forma, começamos com a aparência e o comportamento do
aplicativo em uma tela e ambiente móvel.

### Múltiplas telas

Em projetos anteriores, nossas aplicações eram compostas de apenas uma tela
_principal_ (uma só _página_). Neste projeto, precisaremos dividir nossa
interface em várias _pages_ e oferecer uma maneira de navegar entre
essas telas. Esse problema pode ser resolvido de várias maneiras: com arquivos
HTML independentes (cada um com seu próprio URL) e links tradicionais; mantendo
na memória e renderizando condicionalmente (sem atualizar a página);
[manipulando o histórico do
navegador](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API#Navegando_atrav%C3%A9s_do_hist%C3%B3rico)
com
[`window.history`](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API).
Neste projeto, convidamos você a explorar opções e decidir sobre uma opção de
implementação.

### Gravação de dados

Nos projetos anteriores, consumimos dados, mas ainda não tínhamos escrito dados
(salvar alterações, criar dados, excluir, etc). Neste projeto, você precisará
criar (salvar) novos dados, além de ler, atualizar e modificar os dados
existentes. Esses dados podem ser salvos remotamente usando o
[Firebase](https://firebase.google.com/).

Outras:

- [Mobile
  First](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/)
- [Mobile First Is NOT Mobile Only - Nielsen Norman
  Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
- [Flexbox - CSS
  Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Módulos:
  Export](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export)
- [Módulos:
  Import](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import)
