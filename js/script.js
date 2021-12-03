var listaDeVehiculos = [];
var idVehiculo;

function $(id) {
    return document.getElementById(id);
}

//Asocio los eventos.
window.addEventListener("load",()=>{

    Formulario.CargarInformacion();

    //Boton Alta
    $("btnAlta").addEventListener("click",()=>{ 
        $("divDatos").hidden = false;
    })

    //Boton Cerrar
    $("btnCerrar").addEventListener("click",()=>{ 
        $("divDatos").hidden = true;
    })

    //Boton Agregar
    $("btnAgregar").addEventListener("click",()=>{ 
        Formulario.AgregarVehiculo();
    })

    //Boton Promedio
    $("btnPromedio").addEventListener("click",()=>{

        let promise = Formulario.CalcularPromedioPrecio();
        promise.then(respuesta=>{

            $("txtPromedio").value = parseFloat(respuesta.toString()).toFixed(2);

        }).catch(f=>{
            console.log("Error");
        })
    }) 

    $("sel_tipoVehiculo").addEventListener("change",()=>{
        let promise = Formulario.FiltrarLista();
        promise.then(respuesta=>{
            Formulario.ArmarTablaVehiculos(respuesta);
        }).catch(f=>{
            console.log("Error");
        })
    })

    $("chk_id").addEventListener("change",()=>{
        let promise = Formulario.FiltrarLista();
        promise.then(listaFiltrada=>{
            Formulario.ArmarTablaVehiculos(listaFiltrada);
        }).catch(f=>{
            console.log("Error");
        })
    })
    $("chk_marca").addEventListener("change",()=>{
        let promise = Formulario.FiltrarLista();
        promise.then(listaFiltrada=>{
            Formulario.ArmarTablaVehiculos(listaFiltrada);
        }).catch(f=>{
            console.log("Error");
        })
    })
    $("chk_modelo").addEventListener("change",()=>{
        let promise = Formulario.FiltrarLista();
        promise.then(listaFiltrada=>{
            Formulario.ArmarTablaVehiculos(listaFiltrada);
        }).catch(f=>{
            console.log("Error");
        })
    })
    $("chk_precio").addEventListener("change",()=>{
        let promise = Formulario.FiltrarLista();
        promise.then(listaFiltrada=>{
            Formulario.ArmarTablaVehiculos(listaFiltrada);
        }).catch(f=>{
            console.log("Error");
        })
    })

})

