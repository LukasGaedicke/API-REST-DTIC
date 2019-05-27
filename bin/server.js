'use strict'

const app = require('../app');

//importando modulos
//expressando sem caminho, por padrao irá buscar na pasta node_modules
const http = require('http');

const port = 3004;

//sentado a porta do server
app.set('port', port);

//criando um servidor, passando o express como paramentro
const server  = http.createServer(app);

//setando para ouvir os eventos
server.listen(port);

//ouvindo evetos de error
server.on('error', onError);
//ouvindo evetos para debugar
server.on('listening', onListening);

console.log('Servidor rodando na porta ' + port);

//usando o modulo debug
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
  'pipe' + addr :
  'port' + addr.port;
}

//tratativa de erros do servidor (não aplicação)
function onError(error) {
    if (console.error.syscall !== 'listen') {
      throw error;
    }
    const bind  = typeof port === 'string' ?
    'Pipe' + port :
    'Port' + port;
  
    switch (error.code) {
        case EACCES:
          console.error(bind + 'is already in use');
          process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  
  
  
  
  
  
  
  
  
 

  