const mainUrl = require('../../config');

const data = {
    "header": [
      {
        "nome" : "Nome",
        "matricula" : "Matricula",
        "curso" : "Curso",
        "ano_ingresso" : "Ano de ingresso"
      }
    ] , 
    "url" : global.MAIN_URL +"?data=Alunos&quantidade="  
}
module.exports = data;