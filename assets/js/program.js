'use strict';

// Generate the program list
function showPrograms(data)
{
    $('#program-list').html(''); // clear the list

    // Append each program to the list
    data.forEach(element => {
        $('#program-list').append('<div class="mt-3 bg-light border rounded text-center"><h1>' + element.name + 
        '</h1><div class="d-flex justify-content-between"><div class="justify-content-evenly"><button type="button" class="btn'
        + ' btn-secondary" id="editProgram" value="' + element.id +'"><i class="bi bi-pencil-square"></i></button><button type='
        + '"button" class="btn btn-danger" id="deleteProgram" value="' + element.id + '"><i class="bi bi-trash"></i></button></div>'
        + '<button type="button" class="btn btn-primary me-3" id="addExercise" value="' + element.id + '"><i class="bi bi-plus-square">'
        + '</i> Add exercise</button></div><table class="table"><thead><tr><th scope="col">Exercise name</th><th scope="col">Serie</th><th scope="col">Repetition</th><th scope="col">Description</th><th scope="col">Edit</th><th scope="col">Delete</th></tr></thead><tbody id="program'
        + element.id + '-list"></tbody></table></div>');
        ajaxRequest('GET', '../php/request.php/exercise', showExercises, 'id_program=' + element.id);
    });

    // Add event listener to add exercise button
    $('#addExercise').click('button', () => {
        let id_program = $(event.target).attr('value');
        let name = $('#AddExerciseName').val();
        let serie = $('#AddExerciseSerie').val();
        let repetition = $('#AddExerciseRepetition').val();
        let description = $('#AddExerciseDescription').val();
        let data = 'name=' + name + '&serie=' + serie + '&repetition=' + repetition + '&description=' + description + '&id_program=' + id_program;
        $('#AddExerciseName').val('');
        $('#AddExerciseSerie').val('');
        $('#AddExerciseRepetition').val('');
        $('#AddExerciseDescription').val('');
        ajaxRequest('POST', '../php/request.php/exercise', showExercises, data);
    });

    // Add event listener to delete program button
    $('#editProgram').click('button', () => {
        console.log($(event.target).attr('value'));
        let id = $(event.target).attr('value');
        $('#UpdateProgramId').val(id);
        $('#UpdateProgramName').val($('#program'+id+'-list').parent().find('h1').text());
        $('#updateProgramBackdrop').modal('show');
    });
}

function showExercises(data)
{
    // Append each exercise to it's program
    data.forEach(element => {
        $('#program'+element.id_program+'-list').append('<tr><td scope="row">' + element.name + '</td><td>' + element.serie + '</td><td>' + element.repetition + '</td><td>' + element.description + '</td><td><button type="button" class="btn btn-secondary" id="editExercise" value="' + element.id + '"><i class="bi bi-pencil-square"></i></button></td><td><button type="button" class="btn btn-danger" id="deleteExercise" value="' + element.id + '"><i class="bi bi-trash"></i></button></td></tr>');
    });

    // Add event listener to edit exercise button
    $('#editExercise').click('button', () => {
        let id = $(event.target).attr('value');
        // Call the modal to edit an exercise and send it the exercise id
    });

    // Add event listener to delete exercise button
    $('#deleteExercise').click('button', () => {
        let id = $(event.target).attr('value');
        // Call the modal to delete an exercise and send it the exercise id
    });
}

ajaxRequest('GET', '../php/request.php/program', showPrograms);

// Add event listener to add program button
$('#AddProgramBtn').click('button', () => {
    let name = $('#AddProgramName').val();
    let data = 'name=' + name;
    $('#AddProgramName').val('');
    ajaxRequest('POST', '../php/request.php/program', showPrograms, data);
});

// Add event listener to update program button
$('#UpdateProgramBtn').click('button', () => {
    let name = $('#UpdateProgramName').val();
    let id = $('#UpdateProgramId').val();
    let data = 'name=' + name + '&id=' + id;
    $('#UpdateProgramName').val('');
    $('#UpdateProgramId').val('');
    ajaxRequest('PUT', '../php/request.php/program', showPrograms, data);
});

// Add event listener to delete program button
$('#DeleteProgramBtn').click('button', () => {
    let id = $(event.target).attr('value');
    $('#DeleteProgramId').val(id);
    $('#DeleteProgramName').text($('#program'+id+'-list').parent().find('h1').text());
    $('#deleteProgramBackdrop').modal('show');
}); 
