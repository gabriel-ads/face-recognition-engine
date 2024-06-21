# Face Recognition Engine #

## Introdução

O face-recognition-engine foi criado para ser o intermediador entre os _clientes(Incorporadoras)_ e qualquer ferramenta usada para reconhecimento facial.
Este backend conta com 3 ambientes, Prd, hml e dev(local). Por enquanto, estamos integrados apenas à ferramenta [face-recognition-herta-engine](https://bitbucket.org/smartstaff/face-recognition-herta-engine/src/main/) e apenas com o CRM da patriani(clinte) e nosso Odoo para testes em HML.

O backend conta com CRUD para _Cliente(client)_ e _Incorporadora(developer)_, além de notificar a Incorporadora(Cliente) com o endpoint notify que a ferramenta herta aciona quando uma face é reconhecida. O CRUD de incorporadora é usado apenas por nossos desenvolvedores, e no momento em que uma incorporadora é criada, esse backend gera um token de acesso(JWT), em caso de *Produção*, esse token será fornecido para o incorporadora e a mesma utilizará esse JWT no header como Authorization para utilizar o CRUD de cliente.

Nos demais cenários, o token é utilizado para testes em dev e hml.

## Índice ##

- [Instalação](#instalação)
- [Configurações](#configurações)
- [Ambientes](#ambientes)
- [Uso](#uso)
- [Tecnologias/Referências](#tecnologias/referências)

## Instalação

Para instalar as dependências do projeto e começar a usar, siga os passos abaixo:
Baixe e instale o [Git](https://www.git-scm.com/downloads) e o [Node](https://nodejs.org/en), e então rode os comandos no terminal de sua preferência:

```bash
# Clona o repositório
git clone https://seu_usuario@bitbucket.org/smartstaff/face-recognition-engine.git

# Comando para navegar até o repositório
cd face-recognition-engine

# Então, instale as dependências
npm install
```
Dessa forma, você já terá instalado todas as dependências do projeto e podera ver a pasta *node_modules*.

## Configurações

Este projeto depende de duas coisas importantes para rodar além da instalação:

* Banco de dados postgres
    1. Esse projeto utiliza *Prisma* como ORM e foi configurado para postgres, ou seja, antes de realizar a migração, isso se tratando de um ambiente local, primeiro baixe e instale o Postgres Admin([pgadmin](https://www.pgadmin.org/download/)), e então cria seu database face-recog ou utilize o do postgres. 

* .env
    1. As variáveis de ambiente são cruciais para o funcionamento do backend, abaixo segue as explicações de cada uma delas.
    2. Cada *Ambiente* deve ter sua .env, no caso, os respectivos valores. Ex: no ambiente de hml o DATABASE_URL deve conter a url do banco para HML e assim PRD na mesma linha.

```dotenv
# DATABASE_URL é a url do seu banco de dados
DATABASE_URL="postgresql://postgres:admin@localhost:5432/face-recog?schema=public"

# SECRET_KEY é basicamente a string segredo para o JWT. para cada ambiente, é adicionado -ambiente no fim da frase ex: -hml
SECRET_KEY="nome-do-projeto-inc-users-key"

# HERTA_URL é a URL do CRUD do backend do Herta, a url abaixo se refere a HML.
HERTA_URL="https://face-recognition-herta-engine.onrender.com"

# PATRIANI_URL é a URL do nosso cliente que nos permite ter acesso ao get dos dados dos clientes assim como o post das notificações.
PATRIANI_URL="https://api.dev.construtorapatriani.com.br/leads/notify/leads-arrival"

# PATRIANI_TOKEN é o token de autorização que vai no header das requisições para o cliente.
PATRIANI_TOKEN="Bearer Token_fornecido_pelo_cliente"
```

## Ambientes

Este projeto tem apenas duas branches, *main* e *hml*.

- main
    1. O ambiente _main_ é nosso ambiente de produção, ou seja, é o ambiente que não pode ficar fora do ar nem mesmo ter problemas. Aqui, somente terá as versões de código funcional e sob demanda.
    2. Para colocar qualquer tipo de código nessa branch, deverá ser seguido o [git flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), ou seja, através de branches e pull request.   
    3. A pipeline acontece no próprio bitbucket e o backend está hospedado na EC2(aws).

- hml
    1. O ambiente _hml_ serve para a segunda etapa de testes, no caso, coisas que já funcionaram em development.
    2. Permitido fazer integração com clientes e novos sistemas para reconhecimento facial.
    3. Hospedado no [Render](https://render.com/) e database na [Neon Tech](https://neon.tech/). Em caso de não ter acesso ao ambiente de hml, podemos subir novamente esse ambiente em outra conta ou hospedar na AWS.

- development
    1. Não é uma branch, é apenas o ato de codar e testar localmente em uma branch que partiu da master.
    2. Deve ser desenvolvido e testado até onde conseguir dentro desse ambiente.

## Uso
Segue abaixo o passo a passo para executar o projeto em cada ambiente:

* PRD
```bash
    npm ci
    npm run build
    npx prisma db push
    sudo systemctl restart recog.service
```

* HML
    1. Supondo que ainda se encontra no _Render_
    
```bash
    npm ci && npm run build && prisma db push
    npm run start
```

* Dev
```bash
    npm install
    npx prisma migrate dev
    npm run dev
```

## Tecnologias/Referências
- [Node](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- [Axios](https://axios-http.com/docs/intro)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Dotenv](https://www.npmjs.com/package/dotenv)