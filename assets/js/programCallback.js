'use strict';

// Generate the program list
function showPrograms(data)
{
    $('#program-list').html(''); // clear the list

    // Append each program to the list
    data.forEach(element => {
        $('#program-list').append('<div class="mt-3 bg-light border rounded text-center"><h1>' + element.name + 
        '</h1><div class="d-flex justify-content-between"><div class="justify-content-evenly"><button type="button" class="btn'
        + ' btn-secondary" data-bs-toggle="modal" data-bs-target="#universalModal" data-bs-whatever="editProgram" value="' + element.id +
        '"><i class="bi bi-pencil-square"></i></button><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#universalModal"' +
        ' data-bs-whatever="deleteProgram" value="' + element.id + '"><i class="bi bi-trash"></i></button></div>'
        + '<button type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#universalModal" data-bs-whatever="addExercise" value="' + 
        element.id + '"><i class="bi bi-plus-square"></i> Add exercise</button></div><table class="table"><thead><tr><th scope="col">Exercise name</th>'+
        '<th scope="col">Serie</th><th scope="col">Repetition</th><th scope="col">Description</th><th scope="col">Edit</th><th scope="col">Delete</th></tr></thead><tbody id="program'
        + element.id + '-list"></tbody></table></div>');
        ajaxRequest('GET', '../php/request.php/exercise', showExercises, 'id_program=' + element.id);
    });
}

function showExercises(data)
{
    // Append each exercise to it's program
    data.forEach(element => {
        $('#program'+element.id_program+'-list').append('<tr><td scope="row">' + element.name + '</td><td>' + element.serie + '</td><td>' + 
        element.repetition + '</td><td>' + element.description + '</td><td><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#universalModal"'+
        ' data-bs-whatever="editExercise" value="' + element.id + '"><i class="bi bi-pencil-square"></i></button></td><td><button type="button" class="btn btn-danger" '+
        'data-bs-toggle="modal" data-bs-target="#universalModal" data-bs-whatever="deleteExercise" value="' + 
        element.id + '"><i class="bi bi-trash"></i></button></td></tr>');
    });

}

ajaxRequest('GET', '../php/request.php/program', showPrograms);

