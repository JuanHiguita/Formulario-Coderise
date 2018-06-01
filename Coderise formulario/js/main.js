//--> linea 2 a 4 se ocultan los componentes que no queremos ver en la pagina principal
$('#campos_formulario').hide();
$('#div_fechaSolicitud').hide();
$('#guardar').hide();
//le decimos al programa que al hacer click nos muestre los campos que habiamos ocultado y que oculte los de la pagina principal
$('#Formulario').click(function(){
    $('#Formulario').hide(),
    $('#login').hide(),
    $('#campos_formulario').show(),
    $('#div_fechaSolicitud').show(),
    $('#guardar').show();
});

//escribir en la base de datos 
$('#guardar').click(function(){
var datos_form= {
        nombre:$('#txt-name').val(),
        fecha_nacimiento:$('#date-nacimiento').val(),
        genero:$('#genero').val(),
        email:$('#email-correo').val(),
        telefono:$('#txt-telefono').val(),
        departamento:$('#departamentos').val(),
        ciudad:$('#ciudades').val(),
        tipo_domicilio:$('#inlineRadio-domicilio').val(),
        direccion:$('#txt-direccion').val(),
        ingresos:$('#txt-pregunta2').val(),
        ingresos_mascota:$('#txt-pregunta3').val(),
        experiencia:$('#inlineRadio-experiencia').val(),
        tiempo_mascota:$('#text-pregunta4').val(),  
   };
   console.log(datos_form);
   firebase.database().ref('/datos_usuario')
   .push(datos_form);
});



let stateDropdown = $('#departamentos');
let cityDropdown = $('#ciudades');

stateDropdown.prop('selectedIndex', 0);
let jsonData = {};

const url = '/js/data.json';
$.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
        stateDropdown.append($('<option></option>').attr('value', entry.id).text(entry.departamento));
    });
    jsonData = data;
});

stateDropdown.on('change', function(){
    let stateValue = this.value;

    $.each(jsonData, function (key, entry) {
        if ( entry.id == stateValue ) {
            cityDropdown.empty();
            cityDropdown.append($('<option></option>').attr('value', '').text('Selecciona una Ciudad'));
            cityDropdown.prop('selectedIndex', 0);
            if ( !entry.ciudades == false ) {
                $.each(entry.ciudades, function (key, entry) {
                    cityDropdown.append($('<option></option>').attr('value', key).text(entry));
                });
            }
        }
    });
});

/*
1 - 2   =>  Creamos variables para los selectores
    4   =>  Seleccionamos el primer option en departamentos
    6   =>  Creamos un objeto vacio
    7   =>  Definimos donde esta la data
8 - 13  =>  Peticion "AJAX" con jQuery
9 - 11  =>  Por cada elemento en la data creamos un objeto option con el valor de ID y el texto de departamento (en data)
    12  =>  Guardar la data en la variable de la linea 5
15 - 30 =>  Si hay un cambio en el select de departamentos populamos/llenamos las ciudades respecticas
    16  =>  Guardando en variable el valor del select de departamentos
18 - 29 =>  Recorremos cada elemento de la variable en la linea 5
    19  =>  Buscamos el objeto que tengo el ID igual al seleccionado en el selector de departamentos
    20  =>  Limpiamos el selector de ciudades
    21  =>  Agregamos el elemento por default al selector
    22  =>  Seleccionamos el primer option en ciudades
    23  =>  Revisamos si ciudades existe dentro del objeto seleccionado
24 - 26 =>  Por cada elemento en la data de ciudades creamos un objeto option con el valor de key y el texto de la ciudad (en data)
*/