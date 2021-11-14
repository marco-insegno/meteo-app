window.addEventListener('load', onLoad);

function onLoad(){

    //  STILE BODY
    let body = document.querySelector('body');
    body.classList.add('body');

    //  STILE H1
    let titolo = document.querySelector('h1');
    titolo.classList.add('h1');

    //  STILE LABEL
    let label = document.querySelector('label');
    label.classList.add('label')

    //  STILE INPUT
    let input = document.querySelector('input');
    input.classList.add('input');

    //  BOTTONE TEMPERATURA
    let temperatura = document.querySelector('#getTemp');
    temperatura.classList.add('buttonGet');
    temperatura.addEventListener('click',getTemperature);

    //  TEMPERATURA RESTITUITA
    let temp = document.querySelector('#tempRest');
    temp.classList.add('temp-restituita');

    //  BOTTONE VENTO
    let vento = document.querySelector('#getWind');
    vento.classList.add('buttonGet');
    vento.addEventListener('click',getWind);

    //  BOTTONE RESET
    let reset = document.querySelector('#reset');
    reset.classList.add('buttonGet');
    reset.classList.add('buttonReset');
    reset.addEventListener('click', getReset);

}

//  FUNZIONE TEMPERATURA
function getTemperature(){

    var httpReq = new XMLHttpRequest();

    //  CAPITALIZZO IL NOME x INSERIMENTO IN LINK
    let input = document.querySelector('#city');
    
    let valore = input.value;
    
    // CONTROLLO SE IL VALORE E' INSERITO
    if(valore){

    let citta = valore[0].toUpperCase() + valore.slice(1);

    httpReq.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+ citta +'&units=metric&appid=a48bdb84f700680b207f9e12d23902e0', true);
    
    httpReq.send();

    httpReq.onreadystatechange = function() {

        if(httpReq.readyState == 4 && httpReq.status == 200) {

            let risposta = JSON.parse(httpReq.response);
            // console.log(risposta);
            
            let dataAggiornata = new Date(risposta.dt*1000);    //  trasformo timestamp restituito in data 
            let oraAggiornata = dataAggiornata.getHours();
            let minutiAggiornati = dataAggiornata.getMinutes();

            let temp = risposta.main.temp;
            let tempMax = risposta.main.temp_max;
            let tempMin = risposta.main.temp_min;

            document.getElementById('tempRest').innerText = `In ${citta} at ${oraAggiornata}:${minutiAggiornati} the temperature is ${temp}°`;
            document.getElementById('tempMaxTempMin').innerHTML = `MAX temperature reached today is ${tempMax}°`+ '<br>' +`MIN temperature reached today is ${tempMin}°`;
        
        } else if(httpReq.readyState == 4 && httpReq.status == 404){

            document.getElementById('tempRest').innerText = 'PLEASE, ENTER A VALID CITY!!';
            document.getElementById('tempMaxTempMin').innerHTML = ``;

        }
    }
    }
    
    if(!valore){
        
        document.getElementById('tempRest').innerText = 'PLEASE, ENTER A CITY!!';
        
    }
    

}

//  FUNZIONE VENTO
function getWind(){

    var httpReq = new XMLHttpRequest();

    //  CAPITALIZZO IL NOME x INSERIMENTO IN LINK
    let input = document.querySelector('#city');
    
    let valore = input.value;
    
    if(valore){
    let citta = valore[0].toUpperCase() + valore.slice(1);

    httpReq.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+ citta +'&units=metric&appid=a48bdb84f700680b207f9e12d23902e0', true);
    
    httpReq.send();

    httpReq.onreadystatechange = function() {

        if(httpReq.readyState == 4 && httpReq.status == 200) {

            let risposta = JSON.parse(httpReq.response);

            let velocitaVento = risposta.wind.speed;
            let direzioneVento = risposta.wind.deg;

            let dataAggiornata = new Date(risposta.dt*1000);    //  trasformo timestamp restituito in data 
            let oraAggiornata = dataAggiornata.getHours();
            let minutiAggiornati = dataAggiornata.getMinutes();


            document.getElementById('tempRest').innerText = `In ${citta} at ${oraAggiornata}:${minutiAggiornati} the wind speed is ${velocitaVento} meters/sec`;
            document.getElementById('tempMaxTempMin').innerHTML = `The wind direction is ${direzioneVento} degrees`;

        } else if(httpReq.readyState == 4 && httpReq.status == 404){

            document.getElementById('tempRest').innerText = 'PLEASE, ENTER A VALID CITY!!';
            document.getElementById('tempMaxTempMin').innerHTML = ``;
            
        }
    }
    }

    if(!valore){
        
        document.getElementById('tempRest').innerText = 'PLEASE, ENTER A CITY!!';

        // window.location.href = window.location.href;
        
    }
    
}

//  FUNZIONE RESET
function getReset(){

    // CANCELLO CAMPI
    let campoInput = document.querySelector('#city');
    campoInput.value = '';
    let campoTempRest = document.querySelector('#tempRest');
    campoTempRest.textContent = '';
    let campoCitta = document.querySelector('#tempMaxTempMin');
    campoCitta.textContent = '';
    
    //  REFRESH PAGINA
    //  window.location.href = window.location.href;

}
