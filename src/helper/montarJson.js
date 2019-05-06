module.exports = {
    montarJson: function (res, total) {

        var data = {
            "data": res,"totalRegistros": total
        }
        return data;
    }
}