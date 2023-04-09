//Funcion main: Se desarrolla toda la lógica de la pantalla "compra_pasaje", alta de un pasajero, selecicón del pais origen y destino, con su fecha ida y vuelta,
//se desarrolla también la selección del asiento del viaje y por último también se desarrolla la vista de pasajeros registrados, ver el pasaje realizado(Comprado),
//y poder volver a comprar otro pasaje volviendo a la página inicial de compra_pasaje.html.


//Se crean las variables para los botones siguientes del formulario, id de los formularios, el loader, modales, botones(compra pasaje,ver pasaje, ver pasajeros registrados)
const buttonEnviarPasajero = document.getElementById('enviarInfoPasajero')
const buttonEnviarOrigenDestino = document.getElementById('enviarInfoPais')
const buttonMostrarViaje = document.getElementById('mostrar-pasajero')
const formContainer = document.getElementsByClassName('form-container')

const formUno = document.getElementById('form1')
const formDos = document.getElementById('form2')
const formTres = document.getElementById('form3')
const formCuatro = document.getElementById('form4')

const formUno_error = document.getElementById('form1_error')
const formDos_error = document.getElementById('form2_error')
const formTres_error = document.getElementById('form3_error')

const btnOrigenDestino = document.getElementById('btn-origen-destino')
const loader = document.getElementById('loader')




const formPasajero = document.getElementById('form-mostrar-pasajero');

const verDetallesPasaje = document.getElementById('modal-body');
const botonVerPasaje = document.getElementById('ver-pasaje')

const botonComprarPasaje = document.getElementById('comprar-pasaje')
const botonEnviarDatosAsiento = document.getElementById('enviarDatosAsiento')
const botonNuevoPasaje = document.getElementById('nuevo-pasaje')

const botonVerPasajeros = document.getElementById('boton-ver-pasajeros')
const verPasajeros = document.getElementById('ver-pasajeros')
const verViajes = document.getElementById('ver-viajes')
const botonVerViajes = document.getElementById('boton-ver-viajes')


//Oculto botones para que se muestren cuando se presione boton COMPRAR PASAJE.
botonNuevoPasaje.style.display = 'none';
botonVerPasaje.style.display = 'none';
botonVerPasajeros.style.display = 'none';
botonVerViajes.style.display = 'none'


//Clase Personas/Pasajeros
class Persona {
    //constructor
    constructor(id, nombre, apellido, email, dni) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.dni = dni
    }

}
//Clase Pais origenes/destinos
class Pais {
    constructor(nombre, localidad) {
        this.nombre = nombre;
        this.localidad = localidad;
    }
}
//Clase Viajes para los Pasajeros
class Viaje {
    constructor(id, persona, origen, destino, precio, horario, fechaIda, fechaVuelta, asiento) {
        this.id = id;
        this.persona = persona;
        this.origen = origen;
        this.destino = destino;
        this.precio = precio;
        this.horario = horario;
        this.fechaIda = fechaIda;
        this.fechaVuelta = fechaVuelta;
        this.asiento = asiento;
    }
}


//Oculto formularios y los muestro en las próximas funciones a medida que va avanzando el registro del pasaje.
formDos.style.display = "none";
formTres.style.display = "none";
formCuatro.style.display = "none";
loader.style.display = "none";

//Bandera declarada en false inicialmente para poder detectar cuando el alta de cada formulario, así pasar al siguiente y mostrar el correspondiente, ocultando el anterior.
let bandera = false;


//declaracion arrays clases
let arrayPersona = []
let arrayPais = []
let arrayViaje = []
let asientosElegidos = []

const paisUno = new Pais("Argentina", "Mendoza")
const paisDos = new Pais("Chile", "Santiago")
const paisTres = new Pais("Brasil", "Brasilia")
arrayPais.push(paisUno, paisDos, paisTres);
//Pasajeros previos registrados
const personaUno = new Persona(1, "Lucas", "Sanchez","lsanchez@gmail.com", "45327743")
const personaDos = new Persona(2, "Mario", "Garcia","msanchez@gmail.com", "27345678")
const personaTres = new Persona(3, "Debora", "Martinez","dmartinez@hotmail.com","33211129")
arrayPersona.push(personaUno, personaDos, personaTres);

const viajeUno = new Viaje(1, personaUno.nombre, 'argentina', 'brasil', 5000, 18, '2023-10-08', '2023-11-08', 1)
const viajeDos = new Viaje(1, personaDos.nombre, 'chile', 'brasil', 5000, 18, '2023-10-08', '2023-11-08', 7)
const viajeTres = new Viaje(1, personaTres.nombre, 'brasil', 'chile', 5000, 18, '2023-10-08', '2023-11-08', 5)

//Eventos botones
buttonEnviarPasajero.addEventListener('click', () => {
    
    altaPersona()
});

btnOrigenDestino.addEventListener('click', () => {
    seleccionarPaisOrigenDestino();
})

buttonEnviarOrigenDestino.addEventListener('click', () => {

    seleccionarFechaHora(origen.value, destino.value);

})

botonVerPasaje.addEventListener('click', () => {
    mostrarPersona();
})

botonVerPasajeros.addEventListener('click', () => {
    verPasajerosRegistrados();
})
botonVerViajes.addEventListener('click', () => {
    verViajesRegistrados();
})



// Verificar si hay registros previos en el localStorage
console.log(arrayViaje)
if (localStorage.length == 0) {
    localStorage.setItem('pasajero', JSON.stringify(arrayPersona));
} else {
    arrayPersona = JSON.parse(localStorage.getItem('pasajero'));
    
}


if(localStorage.getItem('viaje') === null) {
    arrayViaje.push(viajeUno,viajeDos,viajeTres);
    localStorage.setItem('viaje',JSON.stringify(arrayViaje))
} else {
    arrayViaje = JSON.parse(localStorage.getItem('viaje'))
    console.log(arrayViaje)
}






function altaPersona() {

    //Desarrollo de la funcion para el alta de un pasajero que se trata en el primer formulario.

    let nombre = document.getElementById('nombre')
    let apellido = document.getElementById('apellido')
    let dni = document.getElementById('edad').value
    let email = document.getElementById('email').value



    validarPersona(nombre, apellido, dni, email)

        .then((resultado) => {
            loader.style.display = "block"
            buttonEnviarPasajero.disabled = true; //al traer los datos ya correctamente hago 'disabled' el boton para que no vuelva a presionar nuevamente mientras carga la espera.
            if (resultado == true) {
                setTimeout(() => {
                    console.log(arrayPersona)
                    if (localStorage.getItem('pasajero')) {
                        console.log(dni,email)
                        const persona = new Persona(arrayPersona.length + 1, nombre.value, apellido.value,email,dni);
                        console.log('Tu persona fue cargada correctamente.')
                        console.log(arrayPersona)
                        arrayPersona.push(persona);
                        localStorage.setItem('pasajero', JSON.stringify(arrayPersona));
                        console.log(arrayPersona)
                        obtenerPersonas(arrayPersona)
                    }
                    //LocalStorage & JSON. Seteo y recuperación para el alta de una persona.

                    if (bandera == true) {
                        formUno.style.display = "none";
                        formDos.style.display = "block";
                    }
                    loader.style.display = 'none';
                }, 2000)
            }
        })
        .catch((err) => {
            formUno_error.innerText = 'Error: No se han cargado correctamente los atributos';
            return;
        })

}

function obtenerPersonas(arrayPersona) {
    //Desarrollo de la funcion para obtener las Personas registradas y mostrarlas en el último formulario en formato JSON correspondiente a la visualización en HTML.
    arrayPersona = localStorage.getItem('pasajero');
    if (arrayPersona) {
        return JSON.parse(arrayPersona);
    } else {
        return [];
    }
}

function obtenerViajes(arrayViaje) {
    arrayViaje = localStorage.getItem('viaje');
    if(arrayViaje) {
        return JSON.parse(arrayViaje);
    } else {
        return [];
    }
}

function validarPersona(nombre, apellido, dni, email) {

    const nroDni = parseInt(dni);
    const cantidadDigitos = nroDni.toString().length
 
    let validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //expresion regular para la validación del correo electrónico.
  
 
    //Validaciones para el alta de un pasajero.
    return new Promise((res, rej) => {

        

            if (nombre.value === '' || apellido.value === '' || dni.value === '' || email.value === '' || isNaN(nroDni) || cantidadDigitos<8 || cantidadDigitos>=9 || !validarEmail.test(email)) {
                rej(false)
            } else {
                res(true)
                bandera = true; //entender por que si pongo la bandera aca si lo toma y si lo pongo en el then no lo toma como para pasar al siguiente form.
            }
        
        })


}


function seleccionarFechaHora(origen, destino) {
    //Desarrollo para el alta del origen, destino, fechaIda, fechaVuelta para el registro del viaje.

    let fechaIda = document.getElementById('fechaIda')
    let fechaVuelta = document.getElementById('fechaVuelta')

    loader.style.display = 'block';
    validarFechaHora(fechaIda.value, fechaVuelta.value)
    
    .then((res) => {
            buttonEnviarOrigenDestino.disabled = true;

            if (res == true) {
                setTimeout(() => {

                    formDos_error.innerText = 'Cargado correctamente las fechas.'
                    loader.style.display = 'none';
                    if (bandera == false) {
                        formDos.style.display = "none"
                        formTres.style.display = "block"
                        bandera = true;
                    }
                    return seleccionarAsiento(origen, destino, fechaIda.value, fechaVuelta.value);
                }, 2000)
            }

        })
        .catch((err) => {
            loader.style.display = 'none';
            formDos_error.innerText = 'Error: Las fechas no pueden estar vacías o No puede ingresar las mismas fechas o No puede ser la fecha Vuelta menor que la fecha Ida o No puede ingresar una Fecha menor a la de hoy.'
            return;
        })

}


function validarFechaHora(fechaIda, fechaVuelta) {
    //Validaciones para el alta de una fecha ida y una fecha vuelta.
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
  
    let fechaIngresadaConActual = new Date(fechaIda);  //creo una nueva variable para que valide con la fecha de hoy y no ingrese una menor.
 
    return new Promise((res, rej) => {

        if (fechaIda == '' || fechaVuelta == '' || fechaIda === fechaVuelta || fechaIda > fechaVuelta || fechaIngresadaConActual < fechaActual) {
            rej(false)
        } else {
            res(true)
            bandera = false;
        }

    })
}


function seleccionarPaisOrigenDestino() {

    //Se desarrolla otra función para la validación del origen y destino y no tener problemas a la hora de largar errores ya que están en el mismo formulario el alta origen,destino
    //el alta fecha ida y vuelta, y tener en cuenta un error en cada función.

    let origen = document.getElementById('origen')
    let destino = document.getElementById('destino')

    let buscarOrigen = arrayPais.find(
        (pais) => pais.nombre.toLowerCase() == origen.value.toLowerCase()
    )
    let buscarDestino = arrayPais.find(
        (pais) => pais.nombre.toLowerCase() == destino.value.toLowerCase()
    )

    validarPaisOrigenDestino(buscarOrigen, buscarDestino)

        .then((res) => {
            btnOrigenDestino.disabled = true;
            
            formDos_error.innerText = `Cargado correctamente.`
            //Ocultar el boton 'Seleccionar' para que no vuelva a cargar un origen y destino y no se pisen los datos. si el usuario le escapo, se podria crear un final donde puede arreglar las cosas.
        })
        .catch((err) => {
            formDos_error.innerText = `Error: No se encuentra disponible el Origen para viajar, o está vació, o el Destino no se encuentra disponible o está vacío, o el origen y el destino no pueden ser el mismo. Revise el error y intente de nuevo.`
            return;
        })


}


function validarPaisOrigenDestino(buscarOrigen, buscarDestino) {
    return new Promise((res, rej) => {
        if (buscarOrigen == undefined || buscarDestino == undefined || buscarDestino && buscarOrigen != undefined && buscarDestino == buscarOrigen) {
            rej(false)

        } else {
            console.log(origen.value, destino.value)
            res(true)
        }
    })
}


function altaViaje(origen, destino, fechaIda, fechaVuelta, nroAsiento) {

    //desarrollo del alta del viaje, tomando como parámetro lo dado de alta en formularios anteriores, y recorriendo para la persona que está en el momento registrandose.

    let viaje;
    arrayPersona.forEach((persona) => {
        viaje = new Viaje(arrayViaje.length + 1, persona.nombre, origen, destino, 5000, 18, fechaIda, fechaVuelta, nroAsiento)
    })
    if (localStorage.getItem('viaje')){
        arrayViaje.push(viaje)
        localStorage.setItem('viaje',JSON.stringify(arrayViaje));
    }

    botonComprarPasaje.addEventListener('click', () => {
        swal(`Compra realizada.`, `Que tengas un excelente viaje.`, "success");
        botonNuevoPasaje.style.display = 'block';
        botonVerPasaje.style.display = 'block';
        botonVerPasajeros.style.display = 'block';
        botonVerViajes.style.display = 'block'
        botonComprarPasaje.disabled = true;
    })
}


function seleccionarAsiento(origen, destino, fechaIda, fechaVuelta) {

    //desarrollo de la función para seleccionar un asiento, teniendo en cuenta que puede seleccionar un asiento, solamente una única vez.
    //se toma como array el tablero-asientos, donde se han creado todos los botones.

    console.log(origen, destino, fechaIda, fechaVuelta)

    const asientosHTML = document.getElementById('tablero-asientos')
    const asientos = [];
    let asientoElegido = 0;

    console.log(asientosElegidos.length)

    for (let i = 0; i <= 15; i++) {

        const botonesAsientos = document.createElement('button')
        botonesAsientos.classList.add('asiento')
        botonesAsientos.innerHTML = `${asientos.length + 1}`
        asientos.push(botonesAsientos)
        asientosHTML.appendChild(asientos[i]);
        
        botonesAsientos.addEventListener('click', function (event) {
            event.preventDefault(); //Evita el comportamiento predeterminado del boton cuando lo estoy creando (se dirigía de nuevo al primer formulario.)
                if (asientosElegidos.length === 0) {
                asientoElegido = (asientos.indexOf(this) + 1);
                asientosElegidos.push(asientoElegido)
                swal(`Excelente ha seleccionado el asiento: ${asientoElegido}`);

                return pasarDatosViaje(origen, destino, fechaIda, fechaVuelta, asientoElegido)
            } else {
                swal(`Ya ha elegido un asiento.`);
            }
        })
    }


}


function pasarDatosViaje(origen, destino, fechaIda, fechaVuelta, asiento) {
    //creo que esta función así tengo tiempo de al momento de presionar el boton del asiento SE GUARDE EL PASAJE y poder mostrar otro formulario
    //en donde al usuario se le dará como una vista con el botón COMPRAR PASAJE cuando ya se ha guardado el viaje al momento de seleccionar el asiento para poder dirigrme al otro formulario y dar una interacción final.

    botonEnviarDatosAsiento.addEventListener('click', () => {
        loader.style.display = 'block';
        botonEnviarDatosAsiento.disabled = true;
        setTimeout(() => {
            if (bandera == true) {
                loader.style.display = 'none';
                formTres.style.display = "none"
                formCuatro.style.display = "block"
            }
            altaViaje(origen, destino, fechaIda, fechaVuelta, asiento)
        }, 2000)
    })

}

function mostrarPersona() {
    //funcion que muestra el pasaje, creando un array que se obtiene en la función obtenerPersonas(); y recorriendo el viaje que se registró actualmente para mostrar
    //datos del viaje con la persona última registrada.
    const arrayPersona = obtenerPersonas();

    console.log(arrayPersona)

    arrayViaje.forEach((viaje) => {
        for (let persona of arrayPersona) {
            verDetallesPasaje.innerHTML = `
            <div class="row">
            <div class="col-4">
              <p><strong>Origen:</strong> ${viaje.origen}</p>
            </div>
            <div class="col-4 text-center">
              <img src="/img/shuttle-bus-1.png" alt="Bus" width="80" height="60" />
            </div>
            <div class="col-4 text-right">
              <p><strong>Destino:</strong> ${viaje.destino}</p>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <p><strong>Nombre:</strong> ${persona.nombre},${persona.apellido}</p>
              <p><strong>Asiento:</strong> ${viaje.asiento}</p>
              <p><strong>Horario:</strong> ${viaje.horario}hs</p>
            </div>
            <div class="col-6">
              <p><strong>Fecha de Ida:</strong> ${viaje.fechaIda}</p>
              <p><strong>Fecha de Vuelta:</strong> ${viaje.fechaVuelta}</p>
              <p><strong>Precio:</strong>$${viaje.precio}</p>
            </div>
          </div>
        </div>
    `
        }
    })


}

function verPasajerosRegistrados() {

    //pasajeros registrados se muestran a través del Modal 'Pasajeros Registrados'

    const arrayPersona = obtenerPersonas();
    const contenedorPasajeros = verPasajeros;

    contenedorPasajeros.innerHTML = "";

    arrayPersona.forEach((persona) => {
        console.log(persona.nombre)
        const pasajero = document.createElement("div")
        pasajero.innerHTML =
            `<p>Pasajero: ${persona.id}</p>
        <p>Nombre: ${persona.nombre}</p>
        <p>Apellido: ${persona.apellido}</p>
        <p>Email: ${persona.email}</p>
        `
        contenedorPasajeros.appendChild(pasajero);
    })
}

function verViajesRegistrados() {

    //viajes registrados se muestran a través del Modal 'Pasajeros Registrados'

    const arrayViaje = obtenerViajes();
    const contenedorViajes = verViajes;

    contenedorViajes.innerHTML = "";

    arrayViaje.forEach((viaje) => {
        
        const nuevoViaje = document.createElement("div")
        nuevoViaje.innerHTML =
       `<p>ID: ${viaje.id}</p>
        <p>Ida: ${viaje.origen}</p>
        <p>Vuelta: ${viaje.destino}</p>
        <p>Asiento: ${viaje.asiento}</p>
        <p>Pasajero: ${viaje.persona}</p>
        `
        contenedorViajes.appendChild(nuevoViaje);
    })
}
