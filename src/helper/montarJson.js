module.exports = {
    montarJson: function (res, total) {

        var data = {
            "data": res,"totalRegistros": total
        }
        return data;
    },
    montarJsonHeader: function (res) {
        var data = {
            "data": res
        }
        return data;
    }
}