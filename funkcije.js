var Koeficijent = [
    { 'name': 'Mokar led', 'k': 0.15 },
    { 'name': 'Led', 'k': 0.2 },
    { 'name': 'Mokar snijeg', 'k': 0.3 },
    { 'name': 'Snijeg', 'k': 0.4 },
    { 'name': 'Blato', 'k': 0.4 },
    { 'name': 'Makadam', 'k': 0.5 },
    { 'name': 'Gladak asfalt', 'k': 0.6 },
    { 'name': 'Mokri grubi asfalt', 'k': 0.7 },
    { 'name': 'Grubi asfalt', 'k': 0.8 }
];
function RacunanjeZaustavnogPuta(brzina) {
    var listaZaustavniPut = [];
    for (var i = 0; i < 9; i++) {
        var putKocenja = Math.round(0.004 * (Math.pow(brzina, 2) / Koeficijent[i].k));
        var putReakcije = Math.round(brzina * 0.5); //reakcija vozaca = 0.5s (0.3s + 0.2s)
        var zaustavniPut = putKocenja + putReakcije;
        listaZaustavniPut.push(zaustavniPut);
    }
    return listaZaustavniPut;
}
function nastavakVoznjeIstomBrzinom(brzina) {
    var PutDokTrajeZutoSvijetlo = String(Math.round(brzina / 3.6 * 3)); // trajanje semafora = 3s
    return PutDokTrajeZutoSvijetlo;
}
function dodajemGasa(brzina) {
    var PutDokTrajeZutoSvijetloSGasom = String(Math.round((brzina / 3.6) * 3 + 0.5 * 3 * Math.pow(3, 2))); // trajanje semafora = 3s, prosječna akceleracija 3m/s**2
    return PutDokTrajeZutoSvijetloSGasom;
}
function hoceLiSeZakonPrekrsiti() {
}
var button = document.getElementById('button');
var input = document.getElementById('input1');
var div = document.getElementById('rez');
function ispis() {
    var brzina = +input.value;
    for (var i = 0; i < 9; i++) {
        var zaustavniPut = RacunanjeZaustavnogPuta(brzina)[i];
        var putIstomBrzinom = nastavakVoznjeIstomBrzinom(brzina);
        var putSUbrzanjem = dodajemGasa(brzina);
        var naslov = Koeficijent[i].name;
        if (zaustavniPut > +putSUbrzanjem) {
            div.innerHTML += "\n            <h5>".concat(naslov, ":</h5>\n            <div>\n                <p>Zaustavni put: ").concat(zaustavniPut, "m</p>\n                <p>Put istom brzinom: ").concat(putIstomBrzinom, "m, put s ubrzanjem: ").concat(putSUbrzanjem, "m</p>\n            </div>\n            <div>\n                <p id=\"zakon\">Zakon \u0107e se prekr\u0161iti ako se nalazite ").concat(putSUbrzanjem, "m - ").concat(zaustavniPut, "m od semafora kada se upali \u017Euto svijetlo!</p>\n            </div>\n            \n            ");
        }
        else if (zaustavniPut > +putIstomBrzinom) {
            div.innerHTML += "\n            <h5>".concat(naslov, ":</h5>\n            <div>\n                <p>Zaustavni put: ").concat(zaustavniPut, "m</p>\n                <p>Put istom brzinom: ").concat(putIstomBrzinom, "m, put s ubrzanjem: ").concat(putSUbrzanjem, "m</p>\n            </div>\n            <div>\n                <p id=\"upozorenje\">Zakon \u0107e se prekr\u0161iti ako se nalazite ").concat(putIstomBrzinom, " - ").concat(zaustavniPut, " od semafora kada se upali \u017Euto svijetlo, a vi ne ubrzate!</p>\n            </div>\n        ");
        }
        else {
            div.innerHTML += "\n            <h5>".concat(naslov, ":</h5>\n            <div>\n                <p>Zaustavni put: ").concat(zaustavniPut, "m</p>\n                <p>Put istom brzinom: ").concat(putIstomBrzinom, "m, put s ubrzanjem: ").concat(putSUbrzanjem, "m</p>\n            </div>\n            <div>\n                <p id=\"okej\">Ne\u0107ete prekr\u0161iti zakon.</p>\n            </div>\n        ");
        }
    }
}
button.addEventListener("click", ispis);
var buttonObrisi = document.getElementById('obrisi');
function obrisi() {
    if (div.innerHTML != "") {
        div.innerHTML = "";
    }
}
buttonObrisi.addEventListener("click", obrisi);
