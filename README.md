# API-REST-DTIC

## Visão geral ##

### Passos para o uso da API: ###

* Instalar mongodb:
```bash
Tutorial of installation in: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04

Coleções e campos obrigatórios para o funcinamento da API: 
-graficos
  - referencia
-headers
 - tabelaReferencia
-menus
-usuarios
  -usuario
  -senha
  -nome
  -token
  
```

* Instalar NodeJS:
```bash
Tutorial of installation in: https://nodesource.com/blog/installing-node-js-tutorial-ubuntu/
```

* Instalar as dependências do projeto:
```bash
>cd ~/workspace
>npm install 
```


* Urls da API:

/menu -- Retorna o menu do mongoDB.

Exemplo: {{URL}}/menu?token={{TOKEN}}

/header -- Retorna o cabeçalho do dado específico

Exemplo: {{URL}}/header?data=alunos&token={{TOKEN}}

/ -- Retorna todos os dados de um dado específico

Exemplo: {{URL}}/?data=alunos&token={{TOKEN}}&draw=1&columns%5B0%5D%5Bdata%5D=nome&columns%5B1%5D%5Bdata%5D=matricula&columns%5B2%5D%5Bdata%5D=curso&columns%5B3%5D%5Bdata%5D=ano_ingresso&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=65&search%5Bvalue%5D=&search%5Bregex%5D=false

/graficos -- Retorna os dados de um gráfico específico

Exemplo: {{URL}}/graficos?data=linguagens&token={{TOKEN}}

/login -- Login do usuario.

Exemplo: {{URL}}/login/ (passar no corpo usuario e senha)

/logout -- Saída do sistema.

Exemplo: {{URL}}/logout?token={{TOKEN}}




