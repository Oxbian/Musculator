/* eslint-disable no-undef */

$('#addProgram').on('click', () => {
  $('#universalModalTitle').text('Add a program');
  $('#universalModalBody').html('<form><div class="mb-3"><label for="AddProgramName" class="col-form-label">Program name:</label>'
    + '<input type="text" class="form-control" id="AddProgramName"></div></form>');
  $('#universalModalNo').text('Cancel');
  $('#universalModalYes').text('Add');
  $('#universalModalYes').attr('value', 'AddProgram');
  $('#universalModal').modal('show');
});

$('#program-list').on('click', '.editProgram', (e) => {
  $('#universalModalTitle').text('Edit a program');
  $('#universalModalBody').html(`<form><div class="mb-3"><label for="UpdateProgramName" class="col-form-label">Program name:</label>
  <input type="text" class="form-control" id="UpdateProgramName" value="${$(e.target).closest('.program').find('h1').text()}">
  <input type="hidden" id="UpdateProgramId" value="${$(e.target).closest('.program').data('value')}"></div></form>`);
  $('#universalModalNo').text('Cancel');
  $('#universalModalYes').text('Update');
  $('#universalModalYes').attr('value', 'UpdateProgram');
  $('#universalModal').modal('show');
});

$('#program-list').on('click', '.deleteProgram', (e) => {
  $('#universalModalTitle').text('Delete a program');
  $('#universalModalBody').html(`<input type="hidden" id="DeleteProgramId" value="${$(e.target).closest('.program').data('value')}"><p>Do you want to delete the program:
  ${$(e.target).closest('.program').find('h1').text()} ?</p>`);
  $('#universalModalNo').text('Cancel');
  $('#universalModalYes').text('Delete');
  $('#universalModalYes').attr('value', 'DeleteProgram');
  $('#universalModal').modal('show');
});

$('#program-list').on('click', '.addExercise', (e) => {
  $('#universalModalTitle').text('Add an exercise');
  $('#universalModalBody').html(`<form><div class="mb-3"><label for="AddExerciseName" class="col-form-label">Exercise name:</label>
    <input type="text" class="form-control" id="AddExerciseName"><label for="AddExerciseSerie" class="col-form-label">Exercise serie:</label>
    <input type="number" class="form-control" id="AddExerciseSerie"><label for="AddExerciseRepetition" class="col-form-label">Exercise repetition:</label>
    <input type="number" class="form-control" id="AddExerciseRepetition"><label for="AddExerciseDescription" class="col-form-label">Exercise description:</label>
    <textarea id="AddExerciseDescription" rows="10" cols="45"></textarea><input type="hidden" id="AddExerciseProgramId" value="${$(e.target).closest('.program').data('value')}">
    </div></form>`);
  $('#universalModalNo').text('Cancel');
  $('#universalModalYes').text('Add');
  $('#universalModalYes').attr('value', 'AddExercise');
  $('#universalModal').modal('show');
});

$('#program-list').on('click', '.editExercise', (e) => {
  $('#universalModalTitle').text('Update an exercise');
  $('#universalModalBody').html(`<form><div class="mb-3"><label for="UpdateExerciseName" class="col-form-label">Exercise name:</label>
    <input type="text" class="form-control" id="UpdateExerciseName" value="${$(e.target).closest('tr').find('td:eq(0)').text()}">
    <label for="UpdateExerciseSerie" class="col-form-label">Exercise serie:</label><input type="number" class="form-control" id="UpdateExerciseSerie" value="
    ${$(e.target).closest('tr').find('td:eq(1)').text()}"><label for="UpdateExerciseRepetition" class="col-form-label">Exercise repetition:</label>
    <input type="number" class="form-control" id="UpdateExerciseRepetition" value="${$(e.target).closest('tr').find('td:eq(2)').text()}">
    <label for="UpdateExerciseDescription" class="col-form-label">Exercise description:</label>
    <textarea id="UpdateExerciseDescription" rows="10" cols="45">${$(e.target).closest('tr').find('td:eq(3)').text()}
    </textarea><input type="hidden" id="UpdateExerciseId" value="${$(e.target).closest('.editExercise').val()}">
    <input type="hidden" id="UpdateExerciseProgramId" value="${$(e.target).closest('.program').data('value')}"></div></form>`);
  $('#universalModalNo').text('Cancel');
  $('#universalModalYes').text('Update');
  $('#universalModalYes').attr('value', 'UpdateExercise');
  $('#universalModal').modal('show');
});

$('#program-list').on('click', '.deleteExercise', (e) => {
  $('#universalModalTitle').text('Delete an exercise');
  $('#universalModalBody').html(`<input type="hidden" id="DeleteExerciseId" value="${$(e.target).closest('.deleteExercise').val()}"><p>Do you want to delete the exercise: 
  ${$(e.target).closest('tr').find('td:eq(0)').text()} ?</p><input type="hidden" id="DeleteExerciseProgramId" value="${$(e.target).closest('.program').data('value')}">`);
  $('#universalModalNo').text('Cancel');
  $('#universalModalYes').text('Delete');
  $('#universalModalYes').attr('value', 'DeleteExercise');
  $('#universalModal').modal('show');
});

$('#universalModalYes').click('button', () => {
  switch ($('#universalModalYes').attr('value')) {
    case 'AddProgram': {
      const addProgramName = $('#AddProgramName').val();
      ajaxRequest('POST', '../php/request.php/program', () => {
        ajaxRequest('GET', '../php/request.php/program', showPrograms);
      }, `name=${addProgramName}`);
      $('#universalModal').modal('hide');
      break;
    }

    case 'UpdateProgram': {
      const updateProgramName = $('#UpdateProgramName').val();
      const updateProgramId = $('#UpdateProgramId').val();
      ajaxRequest('PUT', `../php/request.php/program/${updateProgramId}`, () => {
        ajaxRequest('GET', '../php/request.php/program', showPrograms);
      }, `name=${updateProgramName}`);
      $('#universalModal').modal('hide');
      break;
    }

    case 'DeleteProgram': {
      const deleteProgramId = $('#DeleteProgramId').val();
      ajaxRequest('DELETE', `../php/request.php/program/${deleteProgramId}`, () => {
        ajaxRequest('GET', '../php/request.php/program', showPrograms);
      });
      $('#universalModal').modal('hide');
      break;
    }

    case 'AddExercise': {
      const addExerciseName = $('#AddExerciseName').val();
      const addExerciseSerie = $('#AddExerciseSerie').val();
      const addExerciseRepetition = $('#AddExerciseRepetition').val();
      const addExerciseDescription = $('#AddExerciseDescription').val();
      const addExerciseProgramId = $('#AddExerciseProgramId').val();
      const addExerciseData = `name=${addExerciseName}&serie=${addExerciseSerie}&repetition=${addExerciseRepetition
      }&description=${addExerciseDescription}&id_program=${addExerciseProgramId}`;
      ajaxRequest('POST', '../php/request.php/exercise', () => {
        $(`#program${addExerciseProgramId}-list`).html(''); // Clear the exercise list
        ajaxRequest('GET', '../php/request.php/exercise', showExercises, `id_program=${addExerciseProgramId}`);
      }, addExerciseData);
      $('#universalModal').modal('hide');
      break;
    }

    case 'UpdateExercise': {
      const updateExerciseName = $('#UpdateExerciseName').val();
      const updateExerciseSerie = $('#UpdateExerciseSerie').val();
      const updateExerciseRepetition = $('#UpdateExerciseRepetition').val();
      const updateExerciseDescription = $('#UpdateExerciseDescription').val();
      const updateExerciseId = $('#UpdateExerciseId').val();
      const updateExerciseProgramId = $('#UpdateExerciseProgramId').val();
      const updateExerciseData = `name=${updateExerciseName}&serie=${updateExerciseSerie}&repetition=${updateExerciseRepetition
      }&description=${updateExerciseDescription}&id_program=${updateExerciseProgramId}`;
      ajaxRequest('PUT', `../php/request.php/exercise/${updateExerciseId}`, () => {
        $(`#program${updateExerciseProgramId}-list`).html(''); // Clear the exercise list
        ajaxRequest('GET', '../php/request.php/exercise', showExercises, `id_program=${updateExerciseProgramId}`);
      }, updateExerciseData);
      $('#universalModal').modal('hide');
      break;
    }

    case 'DeleteExercise': {
      const deleteExerciseId = $('#DeleteExerciseId').val();
      const deleteExerciseProgramId = $('#DeleteExerciseProgramId').val();
      ajaxRequest('DELETE', `../php/request.php/exercise/${deleteExerciseId}`, () => {
        $(`#program${deleteExerciseProgramId}-list`).html(''); // Clear the exercise list
        ajaxRequest('GET', '../php/request.php/exercise', showExercises, `id_program=${deleteExerciseProgramId}`);
      });
      $('#universalModal').modal('hide');
      break;
    }

    default:
      break;
  }
});
