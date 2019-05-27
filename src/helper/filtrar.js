module.exports = {
    getFiltrosDatatable: function (array) {
        //array[DATA],array[START], array[LENGTH], array[SEARCH], array[ascOuDesc], array[nameCollumn]


        var searchByFil = array[3];


        var ascOuDescFil;
        if (array[4] == 'desc') {
            y = -1;
        } else {
            y = 1;
        }

        var startFil;
        if (array[1] <= 0) {
            startFil = 0;
        }

        var lengthFil; 
        if (array[2] <= 0) {
            lengthFil = 0
        }



        var dadosFiltrados = [data, startFil, lengthFil, searchByFil, ascOuDescFil, nameCollumn];

        return dadosFiltrados;
    }
}