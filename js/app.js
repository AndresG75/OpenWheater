const contenedor = document.querySelector('#container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load',BuscarClima);

function BuscarClima(){
    formulario.addEventListener('submit',ValidarForm)
}

function ValidarForm(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Todos los campos deben ser obligatorios','error');
        return
    }

    //Consultar API
    consultarApi(ciudad,pais);
}

function mostrarError(mensaje,tipo){
    const divMensaje = document.createElement('div');

    const alerta = document.querySelector('.bg-red-100');
    if(!alerta){
        if(tipo==='error'){
            divMensaje.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );
        }
    
        divMensaje.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
    `;
    
        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }


}

function consultarApi(ciudad,pais){
    const key = '266bdac1dffbffe16458bcde32bb0de0';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;

    Spinner();

    fetch(url)
    .then(resultado => resultado.json())
    .then(datos => mostrarDatos(datos) );
}

function mostrarDatos(datos){
    eliminarHTML();
    const {name, main: {temp, temp_max, temp_min}} = datos;
    const grados = convertCelcius(temp);
    const min = convertCelcius(temp_min);
    const max = convertCelcius(temp_max);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${grados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl')
  
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')
  
  
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')
  
  
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
  
    resultado.appendChild(resultadoDiv)
}

 let convertCelcius =  ((temp) => {return parseInt(temp - 273.15)});

 function eliminarHTML(){
     while(resultado.firstChild){
         resultado.firstChild.remove()
     }
 }

 function Spinner() {

    eliminarHTML();
  
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
  
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
  }

