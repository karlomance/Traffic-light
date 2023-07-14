
let Koeficijent: {name: string, k: number}[] = [
    {'name': 'Mokar led','k': 0.15},
    {'name': 'Led', 'k': 0.2,},
    {'name': 'Mokar snijeg', 'k': 0.3,},
    {'name': 'Snijeg', 'k': 0.4,},
    {'name': 'Blato', 'k': 0.4,},
    {'name': 'Makadam', 'k': 0.5,},
    {'name': 'Gladak asfalt', 'k': 0.6,},
    {'name': 'Mokri grubi asfalt', 'k': 0.7,},
    {'name': 'Grubi asfalt', 'k': 0.8}
];

function RacunanjeZaustavnogPuta (brzina: number): number[]{ // Brzina u (km/h)
    var listaZaustavniPut: number[] = []
    for (let i = 0; i < 9; i++){
        let putKocenja = Math.round(0.004 * (brzina ** 2 / Koeficijent[i].k))
        let putReakcije = Math.round(brzina * 0.5) //reakcija vozaca = 0.5s (0.3s + 0.2s)
        let zaustavniPut = putKocenja + putReakcije
        listaZaustavniPut.push(zaustavniPut)
    }
    return listaZaustavniPut 
}


function nastavakVoznjeIstomBrzinom (brzina: number): string{
    let PutDokTrajeZutoSvijetlo = String(Math.round(brzina/3.6 * 3)) // trajanje semafora = 3s
    return PutDokTrajeZutoSvijetlo
}



function dodajemGasa (brzina: number): string{
    let PutDokTrajeZutoSvijetloSGasom = String(Math.round((brzina / 3.6) * 3 + 0.5 * 3 * 3**2)) // trajanje semafora = 3s, prosječna akceleracija 3m/s**2
    return PutDokTrajeZutoSvijetloSGasom
}

function hoceLiSeZakonPrekrsiti(){

}




const button = document.getElementById('button') as HTMLButtonElement;
const input = document.getElementById('input1') as HTMLInputElement;
const div = document.getElementById('rez') as HTMLDivElement;



function ispis(): void{
    let brzina = +input.value
    for (let i = 0; i < 9; i++){
        let zaustavniPut = RacunanjeZaustavnogPuta(brzina)[i]
        let putIstomBrzinom = nastavakVoznjeIstomBrzinom(brzina)
        let putSUbrzanjem = dodajemGasa(brzina)
        let naslov = Koeficijent[i].name

        if (zaustavniPut > +putSUbrzanjem){
            div.innerHTML +=  `
            <h5>${naslov}:</h5>
            <div>
                <p>Zaustavni put: ${zaustavniPut}m</p>
                <p>Put istom brzinom: ${putIstomBrzinom}m, put s ubrzanjem: ${putSUbrzanjem}m</p>
            </div>
            <div>
                <p id="zakon">Zakon će se prekršiti ako se nalazite ${putSUbrzanjem}m - ${zaustavniPut }m od semafora kada se upali žuto svijetlo!</p>
            </div>
            
            `
        } else if(zaustavniPut > +putIstomBrzinom) {
            div.innerHTML +=  `
            <h5>${naslov}:</h5>
            <div>
                <p>Zaustavni put: ${zaustavniPut}m</p>
                <p>Put istom brzinom: ${putIstomBrzinom}m, put s ubrzanjem: ${putSUbrzanjem}m</p>
            </div>
            <div>
                <p id="upozorenje">Zakon će se prekršiti ako se nalazite ${putIstomBrzinom} - ${zaustavniPut} od semafora kada se upali žuto svijetlo, a vi ne ubrzate!</p>
            </div>
        `;
        } else {
            div.innerHTML +=  `
            <h5>${naslov}:</h5>
            <div>
                <p>Zaustavni put: ${zaustavniPut}m</p>
                <p>Put istom brzinom: ${putIstomBrzinom}m, put s ubrzanjem: ${putSUbrzanjem}m</p>
            </div>
            <div>
                <p id="okej">Nećete prekršiti zakon.</p>
            </div>
        `;
        }
    }

}
button.addEventListener("click", ispis); 




let buttonObrisi = document.getElementById('obrisi')as HTMLButtonElement
function obrisi(): void{
    if(div.innerHTML != ""){
        div.innerHTML = "";
    }
}
buttonObrisi.addEventListener("click", obrisi)


