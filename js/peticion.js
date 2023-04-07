//Se realiza un nuevo archivo js para dividir la parte de la API. Se utiliza la API https://restcountries.com para traer los paises, banderas, capitales que se utilizaran
//en la elección del destino y origen.


const url_arg = 'https://restcountries.com/v3.1/name/argentina'
let pais_arg = document.getElementById('pais_arg')

fetch(url_arg)
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
    for (let pais of data) {
        console.log(pais.name)
        pais_arg.innerHTML = `
        <img class="card-img-top" src=${pais.flags.png} alt="Card image cap">
        <p class="card-text">Pais: ${pais.name.common}</p>
        <p class="card-text">Capital: ${pais.capital}</p>
        `
    }
})

const url_br = 'https://restcountries.com/v3.1/name/brasil'
let pais_br = document.getElementById('pais_br')

fetch(url_br)
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
    for (let pais of data) {
        console.log(pais.name)
        pais_br.innerHTML = `
        <img class="card-img-top" src=${pais.flags.png} alt="Card image cap">
        <p class="card-text">Pais: ${pais.name.common}</p>
        <p class="card-text">Capital: ${pais.capital}</p>
        `
    }
})
const url_cl = 'https://restcountries.com/v3.1/name/chile'
let pais_cl = document.getElementById('pais_cl')

fetch(url_cl)
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
    for (let pais of data) {
        console.log(pais.name)
        pais_cl.innerHTML = `
        <img class="card-img-top" src=${pais.flags.png} alt="Card image cap">
        <p class="card-text">Pais: ${pais.name.common}</p>
        <p class="card-text">Capital: ${pais.capital}</p>
        `
    }
})
