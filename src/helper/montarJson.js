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
        var data = {
            "data": res, "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGUiLCJpYXQiOjE1NTc3NzM5NjQsImV4cCI6MTU1Nzg2MDM2NH0.TNLlJUxYAvg9AYFvwcNw7KpBXEBbCVM42zuoHda613o"
        }
        return data;
    }
}