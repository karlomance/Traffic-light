
let Coefficient: {name: string, k: number}[] = [
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

function CalculationOfTheStoppingDistance (speed: number): number[]{ // Brzina u (km/h)
    var arrayStoppingDistance: number[] = []
    for (let i = 0; i < 9; i++){
        let breakingDistance = Math.round(0.004 * (speed ** 2 / Coefficient[i].k))
        let reactionPathway = Math.round(speed * 0.5) //reakcija vozaca = 0.5s (0.3s + 0.2s)
        let stoppingDistance = breakingDistance + reactionPathway
        arrayStoppingDistance.push(stoppingDistance)
    }
    return arrayStoppingDistance 
}


function continueDrivingAtTheSameSpeed (speed: number): string{
    let roadWhileTheYellowLightLasts = String(Math.round(speed/3.6 * 3)) // trajanje semafora = 3s
    return roadWhileTheYellowLightLasts
}



function addingGas (speed: number): string{
    let roadWhileTheYellowLightLastsWithGas = String(Math.round((speed / 3.6) * 3 + 0.5 * 3 * 3**2)) // trajanje semafora = 3s, prosječna akceleracija 3m/s**2
    return roadWhileTheYellowLightLastsWithGas
}



const buttonEnter = document.getElementById('button-enter') as HTMLButtonElement;
const input = document.getElementById('input') as HTMLInputElement;
const div = document.getElementById('result') as HTMLDivElement;



function willTheLawBeBroken(): void{
    let speed = +input.value
    for (let i = 0; i < 9; i++){
        let stoppingDistance = CalculationOfTheStoppingDistance(speed)[i]
        let pathWithTheSameSpeed = continueDrivingAtTheSameSpeed(speed)
        let pathWithGas = addingGas(speed)
        let title = Coefficient[i].name

        if (stoppingDistance > +pathWithGas){
            div.innerHTML +=  `
            <h5>${title}:</h5>
            <div>
                <p>Zaustavni put: ${stoppingDistance}m</p>
                <p>Put istom brzinom: ${pathWithTheSameSpeed}m, put s ubrzanjem: ${pathWithGas}m</p>
            </div>
            <div>
                <p id="law">Zakon će se prekršiti ako se nalazite ${pathWithGas}m - ${stoppingDistance}m od semafora kada se upali žuto svijetlo!</p>
            </div>
            
            `
        } else if(stoppingDistance > +pathWithTheSameSpeed) {
            div.innerHTML +=  `
            <h5>${title}:</h5>
            <div>
                <p>Zaustavni put: ${stoppingDistance}m</p>
                <p>Put istom brzinom: ${pathWithTheSameSpeed}m, put s ubrzanjem: ${pathWithGas}m</p>
            </div>
            <div>
                <p id="warning">Zakon će se prekršiti ako se nalazite ${pathWithTheSameSpeed} - ${stoppingDistance} od semafora kada se upali žuto svijetlo, a vi ne ubrzate!</p>
            </div>
        `;
        } else {
            div.innerHTML +=  `
            <h5>${title}:</h5>
            <div>
                <p>Zaustavni put: ${stoppingDistance}m</p>
                <p>Put istom brzinom: ${pathWithTheSameSpeed}m, put s ubrzanjem: ${pathWithGas}m</p>
            </div>
            <div>
                <p id="ok">Nećete prekršiti zakon.</p>
            </div>
        `;
        }
    }

}
buttonEnter.addEventListener("click", willTheLawBeBroken); 




let buttonDelete = document.getElementById('button-delete')as HTMLButtonElement
function Delete(): void{
    if(div.innerHTML != ""){
        div.innerHTML = "";
    }
}
buttonDelete.addEventListener("click", Delete)


