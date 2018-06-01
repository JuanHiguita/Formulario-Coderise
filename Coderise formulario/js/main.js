$('#campos_formulario').hide();
$('#div_fechaSolicitud').hide();
$('#guardar').hide();
$('#Formulario').click(function(){

    $('#Formulario').hide(),
    $('#login').hide(),
    $('#campos_formulario').show(),
    $('#guardar').show();

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