module.exports = {
    stringParaInt:function(text) {
    var parse = parseInt(text, 10);
    return parse;
    },
    getLimite: function (inicio, fim) {
        return inicio + fim;
    },
    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}


