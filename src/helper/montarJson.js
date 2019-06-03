module.exports = {
    montarJson: function (vetor) {

        var data = {
            "data": vetor[0],"recordsTotal": vetor[1], "recordsFiltered": vetor[2]
        }
        return data;
    },
    montarJsonHeader: function (res) {
        var data = {
            "data": [res]
        }
        return data;
    },
    montarJsonMenu: function (res) {
        
        return data;
    },
    montarJsonGrafico: function (res) {
        var data = {
            "data": res
        }
        return data;
    }

}