module.exports = {
    montarJson: function (res, total, totalF) {

        var data = {
            "data": res,"recordsTotal": total, "recordsFiltered": totalF
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
    }
}