module.exports = {
    stringParaInt:function(text) {
    var parse = parseInt(text, 10);
    return parse;
    },
    getLimite: function (inicio, fim) {
        return inicio + fim;
    },
    isEmpty(obj) {
        if (obj.length >0 && obj!="" && !(obj.match(/^\s+$/))) {
            return false; 
          }
          return true;
    }

    
      
}


