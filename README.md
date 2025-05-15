# Jotinha Veículos

Sistema completo para gestão de concessionária de veículos, desenvolvido como Trabalho de Conclusão de Curso (TCC). O projeto abrange **front-end** (HTML, CSS, JS) e **back-end** (Node.js, Express, Sequelize, MySQL), com funcionalidades para administração, clientes, agendamento, estoque, destaques, recuperação de senha, consignação e mais.

---

## Índice

* [Funcionalidades](#funcionalidades)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Configuração do Ambiente](#configuração-do-ambiente)
* [Scripts Disponíveis](#scripts-disponíveis)
* [Principais Rotas e Endpoints](#principais-rotas-e-endpoints)
* [Banco de Dados](#banco-de-dados)
* [Observações](#observações)
* [Autor](#autor)

---

## Funcionalidades

* **Autenticação de usuários** (login, cadastro, sessão, criptografia de senha)
* **Recuperação de senha** via e-mail com token seguro
* **Gestão de usuários** (CRUD, alteração de cargo, exclusão)
* **Gestão de veículos** (CRUD, upload de imagens, destaques)
* **Painel administrativo** com dashboard de estatísticas
* **Agendamento de visitas** com envio de e-mail
* **Consignação de veículos** com envio de fotos e dados por e-mail
* **Página de estoque** com filtros e detalhes dos veículos
* **Página inicial** com destaques, carrossel de vendas e agendamento rápido
* **Responsividade** e design moderno
* **Componentização** de header e footer

---

## Tecnologias Utilizadas

* **Back-end:** Node.js, Express, Sequelize, MySQL, bcrypt, JWT, Nodemailer, Multer, Sharp, dotenv
* **Front-end:** HTML5, CSS3 (custom + Bootstrap), JavaScript (ES6+), SweetAlert2, Swiper.js, AOS.js, FontAwesome
* **Outros:** dotenv, express-session, cookie-parser

---

## Estrutura do Projeto

```
TCCjotinha/
├── Back-end/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database/
│   │   │   │   └── database.js
│   │   │   └── sequelize.js
│   │   ├── controllers/
│   │   │   ├── auth.js
│   │   │   ├── carsController.js
│   │   │   ├── agendamentoController.js
│   │   │   └── recuperarSenhaController.js
│   │   ├── models/
│   │   │   ├── user.js
│   │   │   ├── car.js
│   │   │   └── ...
│   │   ├── routes/
│   │   │   └── router.js
│   │   ├── services/
│   │   │   ├── emailServices.js
│   │   │   └── tokenServices.js
│   │   └── server.js
│   └── .env
├── Front-end/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── cars/
│   │   │   ├── dashboard/
│   │   │   └── user/
│   │   ├── agendamento/
│   │   ├── cadastro/
│   │   ├── cardetails/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── consignar/
│   │   ├── contato/
│   │   ├── estoque/
│   │   ├── home/
│   │   ├── login/
│   │   ├── perfil/
│   │   ├── recuperar/
│   │   ├── recuperarSenha/
│   │   └── sobrenos/
│   └── img/
├── sql/
│   └── script.sql
├── package.json
├── package-lock.json
└── README.md
```

---

## Configuração do Ambiente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/TCCjotinha.git
cd TCCjotinha
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o arquivo `.env` dentro da pasta `Back-end`:**

```
DB_NAME=...
DB_HOST=...
DB_USER=...
DB_PASS=...
EMAIL_USER=...
EMAIL_PASS=...
FRONTEND_URL=http://localhost:3000
API_TOKEN=...
```

4. **Configure o banco de dados MySQL:**

   * Execute o script `script.sql` para criar as tabelas e índices.

5. **Inicie o servidor:**

```bash
npm start
```

---

## Scripts Disponíveis

* `npm start` — Inicia o servidor Express em produção.
* `npm run dev` — Inicia o servidor com nodemon para desenvolvimento.

---

## Principais Rotas e Endpoints

### Front-end (Páginas)

* `/home` — Página inicial
* `/login` — Login de usuário
* `/cadastro` — Cadastro de usuário
* `/recuperarsenha` — Recuperação de senha
* `/dashboardAdm` — Dashboard administrativo
* `/carsAdm` — Gerenciamento de veículos (admin)
* `/userAdm` — Gerenciamento de usuários (admin)
* `/agendamento` — Agendamento de visita
* `/estoque` — Estoque de veículos
* `/perfil` — Perfil do usuário
* `/consignar` — Consignação de veículo
* `/sobrenos` — Sobre a empresa
* `/contato` — Contato

### API (Endpoints)

* `POST /login` — Login de usuário
* `POST /cadastro` — Cadastro de usuário
* `POST /recuperar/email` — Envio de link de recuperação de senha
* `POST /recuperar/redefinir` — Redefinição de senha via token
* `GET /usuarios` — Listar usuários (admin)
* `DELETE /deletarUsuario/:id` — Deletar usuário (admin)
* `PUT /atualizarUsuario/:id` — Atualizar tipo de usuário (admin)
* `POST /RegistroCarro` — Cadastro de veículo (admin)
* `GET /Carros` — Listar veículos
* `POST /agendamento/post` — Agendar visita
* `POST /consignar/:id` — Consignação de veículo
* `GET /mostrarDestaques` — Listar veículos em destaque

---

## Banco de Dados

* **Sistema:** MySQL
* **Script de criação:** `script.sql`
* **ORM Utilizado:** Sequelize

---

## Observações

* O projeto utiliza variáveis de ambiente para dados sensíveis.
* O envio de e-mails é feito via Gmail com Nodemailer.
* A recuperação de senha é feita com tokens temporários e seguros.
* O front-end é responsivo e utiliza componentes reutilizáveis para header e footer.
* O painel administrativo é restrito a usuários com permissão de administrador.

---

## Autor

**Desenvolvido por Lucas Letzel**

* Instagram: [@lucasletzel\_](https://instagram.com/lucasletzel_)

Projeto acadêmico — Todos os direitos reservados © 2025
