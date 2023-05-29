/* eslint-disable no-undef */

function showExercises(data) {
  if (data.length === 0 || data == null || data === false) {
    return;
  }

  // Append each exercise to it's program
  data.forEach((element) => {
    $(`#program${element.id_program}-list`).append(`<tr><td scope="row">${element.name}</td><td>${element.serie}</td><td>${element.repetition}
    </td><td>${element.description}</td><td><button type="button" class="btn btn-secondary editExercise" value="${element.id}">
    <i class="bi bi-pencil-square"></i></button></td><td><button type="button" class="btn btn-danger deleteExercise" value="${element.id}">
    <i class="bi bi-trash"></i></button></td></tr>`);
  });
}

// Generate the program list
function showPrograms(data) {
  if (data.length === 0 || data == null || data === false) {
    return;
  }

  $('#program-list').html(''); // clear the list

  // Append each program to the list
  data.forEach((element) => {
    $('#program-list').append(`<div class="mt-3 bg-light border rounded text-center program" data-value="${element.id}"><h1>${element.name}
    </h1><div class="d-flex justify-content-between"><div class="justify-content-evenly"><button type="button" class="btn btn-secondary editProgram">
    <i class="bi bi-pencil-square"></i></button><button type="button" class="btn btn-danger deleteProgram"><i class="bi bi-trash"></i></button></div>
    <button type="button" class="btn btn-primary me-3 addExercise"><i class="bi bi-plus-square"></i> Add exercise</button></div><table class="table">
    <thead><tr><th scope="col">Exercise name</th><th scope="col">Serie</th><th scope="col">Repetition</th><th scope="col">Description</th><th scope="col">
    Edit</th><th scope="col">Delete</th></tr></thead><tbody id="program${element.id}-list"></tbody></table></div>`);
    ajaxRequest('GET', '../php/request.php/exercise', showExercises, `id_program=${element.id}`);
    $(`#program${element.id}-list`).html(''); // Clear the exercise list
  });
}

ajaxRequest('GET', '../php/request.php/program', showPrograms);
