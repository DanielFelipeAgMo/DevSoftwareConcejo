let listaEmpleados = [];//Lista vacía

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
};//Objeto empleado

let editando = false;

//los datos del formulario
const formulario = document.querySelector('#formulario');	
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

//Funcion validar
function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || puestoInput.value === '') {
        alert(' 😵‍💫 Todos los campos se deben diligenciar 😵‍💫');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}
//función agregar
function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

//función limpiar
function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

//función mostrar
function mostrarEmpleados() {
    limpiarHTML();
    const divEmpleados = document.querySelector('.div-empleados');    
    listaEmpleados.forEach(empleado => {
        const {id, nombre, puesto} = empleado;		

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar 📝';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar 🗑️';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

//funcion cargar
function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar🔧 ';
    
    editando = true;
}

//función editar
function editarEmpleado() {
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;
    listaEmpleados.map(empleado => {
        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;
        }
    });
    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar 🧺';    
    editando = false;
}

//función eliminar
function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

//función limpiar html
function limpiarHTML() 	{
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}