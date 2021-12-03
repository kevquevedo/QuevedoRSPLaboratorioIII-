class Vehiculo{

    constructor (p_id, p_marca, p_modelo, p_precio){
        this.id = p_id;
        this.marca = p_marca;
        this.modelo = p_modelo;
        this.precio = p_precio;
    }

}

class Auto extends Vehiculo{

    constructor(p_id, p_marca, p_modelo, p_precio, p_cantidadPuertas){

        super(p_id, p_marca, p_modelo, p_precio);
        this.cantidadPuertas = p_cantidadPuertas;
    }
    
}

class Camioneta extends Vehiculo{

    constructor(p_id, p_marca, p_modelo, p_precio, p_cuatroXcuatro){

        super(p_id, p_marca, p_modelo, p_precio);
        this.cuatroXcuatro = p_cuatroXcuatro;
    }
    
}

class Formulario{
    
    //Función para optimizar el getElementById
    $(id) {
        return document.getElementById(id);
    }

    //CREA LOS TITULOS DE LA TABLA
    static ArmarTitulos(){
        //Titulos
        if($("chk_id").checked == true){
            let th1 = document.createElement("th"); th1.setAttribute("id", "titleId");
            let title1 = document.createTextNode("ID");
            th1.appendChild(title1); $("tabla").appendChild(th1);
        }
        if($("chk_marca").checked == true){
            let th2 = document.createElement("th"); th2.setAttribute("id", "titleMarca");
            let title2 = document.createTextNode("MARCA");
            th2.appendChild(title2); $("tabla").appendChild(th2);
        }
        if($("chk_modelo").checked == true){
            let th3 = document.createElement("th"); th3.setAttribute("id", "titleModelo");
            let title3 = document.createTextNode("MODELO");
            th3.appendChild(title3); $("tabla").appendChild(th3);
        }
        if($("chk_precio").checked == true){
            let th4 = document.createElement("th"); th4.setAttribute("id", "titlePrecio");
            let title4 = document.createTextNode("PRECIO");
            th4.appendChild(title4); $("tabla").appendChild(th4);
        }

        let th5 = document.createElement("th"); th5.setAttribute("id", "titleAccion");
        let title5 = document.createTextNode("Accion");
        th5.appendChild(title5); $("tabla").appendChild(th5);

    }

    //CREA LA TABLA DE VEHICULOS
    static ArmarTablaVehiculos(listaVehiculos)
    { 
        let existTabla = $("tabla");
        if(existTabla){
            existTabla.parentNode.removeChild(existTabla);
        }
        existTabla = document.createElement("table");
        existTabla.setAttribute("id", "tabla");
        $("divTabla").appendChild(existTabla);

        Formulario.ArmarTitulos();
        //Datos Clientes
        listaVehiculos.forEach(vehiculo =>{
            let fila = document.createElement("tr");
            //ID
            if($("chk_id").checked == true){
                let tdId = document.createElement("td");
                let txtId = document.createTextNode(vehiculo.id);
                fila.appendChild(tdId); tdId.appendChild(txtId);
            }
            //Marca
            if($("chk_marca").checked == true){
                let tdMarca = document.createElement("td");
                let txtMarca = document.createTextNode(vehiculo.marca);
                fila.appendChild(tdMarca); tdMarca.appendChild(txtMarca);
            }
            //Modelo
            if($("chk_modelo").checked == true){
                let tdModelo = document.createElement("td");
                let txtModelo = document.createTextNode(vehiculo.modelo);
                fila.appendChild(tdModelo); tdModelo.appendChild(txtModelo);
            }
            //Precio
            if($("chk_precio").checked == true){
                let tdPrecio = document.createElement("td");
                let txtPrecio = document.createTextNode(vehiculo.precio);
                fila.appendChild(tdPrecio); tdPrecio.appendChild(txtPrecio);
            }
            //Boton
            let botonEliminar = document.createElement("button");
            botonEliminar.setAttribute("id", "btnEliminar");
            botonEliminar.addEventListener("click", Formulario.EliminarVehiculo);
            let txtBoton = document.createTextNode("Eliminar");
            fila.appendChild(botonEliminar); botonEliminar.appendChild(txtBoton);

            //Agrego el ID a la fila
            fila.setAttribute("idVehiculo", vehiculo.id.toString());
            $("tabla").appendChild(fila);
        });
    }
    
    //CARGA LA INFORMACION DESDE LA API.
    static async CargarInformacion(){
        try 
        {
            Spinner.mostrarSpinner(true);
            let respuesta = await fetch("http://localhost:3001/vehiculos", {method:'GET', headers:{ 'Content-Type': 'application/json'}});
            if(respuesta.status == "200"){
                
                respuesta.json().then(elementos=>{ 
                    elementos.forEach(elemento =>{
                    
                        if(elemento.hasOwnProperty("cantidadPuertas")){
                            let auto = new Auto(elemento.id, elemento.make, elemento.model, elemento.price, elemento.cantidadPuertas);
                            listaDeVehiculos.push(auto);
                        }else{
                            let camioneta = new Camioneta(elemento.id, elemento.make, elemento.model, elemento.price, elemento.cuatroXcuatro);
                            listaDeVehiculos.push(camioneta);
                        }
                    })
                    Formulario.ArmarTablaVehiculos(listaDeVehiculos);
                    Spinner.mostrarSpinner(false);

                }).catch(error=>{
                    Spinner.mostrarSpinner(false);
                });    
            }
        }catch(error) {
            console.log("Fallo la función 'CargarInformacion'. Con Error: " + error);
        }
    }

    //BUSCA EL ULTIMO ID DE UN VEHICULO.
    static BuscarUltimoID(){
        let resultado = listaDeVehiculos.reduce(function (inicio, vehiculo) { 
            if(inicio < parseInt(vehiculo.id)){
                inicio = parseInt(vehiculo.id);
            }
            return inicio;
        },0)
        resultado += 1;
        return resultado;
    }

   //VALIDA LOS DATOS INGRESADOS PARA EL VEHICULO
   static ValidacionVehiculo(vehiculo)
   {
      
       let validarMarca = true;
       let validarModelo = true;
       let validarPrecio = true;
       let validarTipo = true;

       //Valida el tamaño de la marca.
       if(vehiculo.marca.length <= 2)
       {
           $("txtMarca").style.borderColor="red";          
           validarMarca = false;
       }
       
        //Valida el tamaño del nombre.
        if(vehiculo.modelo.length <= 2)
        {
            $("txtModelo").style.borderColor="red";          
            validarModelo = false;
        }

        //Valida el precio del vehiculo.
        if(vehiculo.precio < 0 || vehiculo.precio > 50000000000)
        {
            $("txtPrecio").style.borderColor="red"; 
            validarPrecio = false;
        }

        //Valida si se seleccionó un tipo.
        let tipo = $("sel_tipo").value.toString();
        if(tipo != "Auto" && tipo != "Camioneta"){
            validarTipo = false;
        }

       return validarMarca && validarModelo && validarPrecio && validarTipo;
   }

   //GENERA EL OBJETO VEHICULO DESDE LOS DATOS DEL FORMULARIO.
    static GenerarObjetoDesdeForm()
    {
        let id = Formulario.BuscarUltimoID(listaDeVehiculos);
        let marca =  $("txtMarca").value.toString();
        let modelo =  $("txtModelo").value.toString();
        let precio = parseInt($("txtPrecio").value.toString());
        let vehiculo;
        if($("sel_tipo").value.toString() == "Auto"){
            vehiculo = new Auto(id, marca, modelo, precio, 5);
        }else{
            vehiculo = new Camioneta(id, marca, modelo, precio, true);
        }
        return vehiculo;
    }

    //AGREGA UN VEHICULO A LA LISTA DE VEHICULOS.
    static AgregarVehiculo(){
        let objeto = Formulario.GenerarObjetoDesdeForm();
        if(Formulario.ValidacionVehiculo(objeto)){
            listaDeVehiculos.push(objeto);
            Formulario.ArmarTablaVehiculos(listaDeVehiculos);
        }
    }

    //BUSCO UN ID, SI LO ENCUENTRO LO RETORNO, SINO RETORNO 0 (CERO)
    static ExisteID(idRecibido){
        let retorno = 0;
        listaDeVehiculos.forEach(vehiculo =>{
            if(vehiculo.id == idRecibido){
                retorno = idRecibido;
            }  
        })
        return retorno;
    }

    //ELIMINA UN VEHICULO DE LA LISTA.
    static EliminarVehiculo(event){

        let fila = event.target.parentNode; 
        idVehiculo = fila.getAttribute("idVehiculo");
        let idBuscado = Formulario.ExisteID(idVehiculo);

        if(idBuscado > 0){
            listaDeVehiculos = listaDeVehiculos.filter(function(vehiculo) {
                return vehiculo.id != idBuscado; 
            });
            let promise = Formulario.FiltrarLista();
            promise.then(listaFiltrada=>{
                Formulario.ArmarTablaVehiculos(listaFiltrada);
            }).catch(f=>{
                console.log("Error");
            })
        } 
    }

    //CALCULA EL PROMEDIO DE LOS PRECIOS.
    static CalcularPromedioPrecio(){

        return new Promise((exito,error)=>{

            let promise = Formulario.FiltrarLista(); //OBTENGO LA LISTA SEGUN LO QUE ESTÉ FILTRADO.
            promise.then(listaFiltrada=>{

                //OBTENGO LA SUMA DE LAS EDADES CON REDUCE
                let totalPrecio = listaFiltrada.reduce(function (inicio, vehiculo) { 
                    return inicio + vehiculo.precio;
                },0)
                
                //HAGO EL PROMEDIO
                if(totalPrecio > 0 && listaFiltrada.length > 0){
                    let promedio = totalPrecio / listaFiltrada.length;
                    exito(promedio);
                }else{
                    error("No se pudo obtener el promedio");
                }

            }).catch(f=>{
                error("No se pudo obtener el promedio");
            })
        });
    }

    //FILTRA LA LISTA.
    static FiltrarLista(){

        return new Promise((exito,error)=>{

            if($("sel_tipoVehiculo").value != null){
                if($("sel_tipoVehiculo").value == "Todos"){
                    exito(listaDeVehiculos);
                }
                if($("sel_tipoVehiculo").value == "Auto"){
                    let listaAuxiliar = listaDeVehiculos.filter(function(vehiculo) {
                        return (vehiculo instanceof Auto == true);
                    });
                    exito(listaAuxiliar); 
                }
                if($("sel_tipoVehiculo").value == "Camioneta"){
                    let listaAuxiliar = listaDeVehiculos.filter(function(vehiculo) {
                        return (vehiculo instanceof Camioneta == true); 
                    });
                    exito(listaAuxiliar); 
                }
            }else{
                error("No se pudo obtener la lista filtrada");
            }
        });
    }

}






