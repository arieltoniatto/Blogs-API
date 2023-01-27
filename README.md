# :construction: README customizado em construção ! :construction:
<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
# Blogs API Project
Esse projeto foi desenvolvido durante o módulo de back-end da Trybe.

## Sobre o projeto
Tivemos como objetivo desenvolver uma aplicação back-end que possui um banco de dados em conjunto com uma API Restful para o gerênciamento e controle de um blog.
Para isso, a aplicação foi dockerizada e desenvolvida em JavaScript implementando a arquitetura MSC (Model, Service, Controller) em conjunto com ORM Sequelize possibilitando o CRUD nos posts. Para as validações foi usada a biblioteca JOI e para a autenticação e criação de token utilizou-se da biblioteca JWT.

## Tecnologias
- Node
- Express
- Sequelize
- MySQL
- Docker
- JWT
- Joi

## Rodando o projeto
 * clone o repositório para a sua máquina através do seu terminal utilizando o comando $git clone git@github.com:arieltoniatto/blogs-api.git
 * entre na pasta clonada e execute o comando $docker-compose up -d --build
 * após inicializado acesse o terminal interativo do container através do comando $docker exec -it blogs_api bash
 * instale as dependências com o comando $npm install
