'use strict';

$('#universalModal').on('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
  
    const id = button.getAttribute('value');
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-whatever')
  
    switch (recipient) {
        case 'addProgram':
            $('#universalModalTitle').text('Add a program');
            $('#universalModalBody').html('<form><div class="mb-3"><label for="AddProgramName" class="col-form-label">Program name:</label>'+
            '<input type="text" class="form-control" id="AddProgramName"></div></form>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Add');
            $('#universalModalYes').attr('value', 'AddProgram');
            break;
    
        case 'editProgram':
            $('#universalModalTitle').text('Edit a program');
            $('#universalModalBody').html('<form><div class="mb-3"><label for="UpdateProgramName" class="col-form-label">Program name:</label>'+
            '<input type="text" class="form-control" id="UpdateProgramName" value="' + $('#program-list').val().find('h1').text() +
            '"><input type="hidden" id="UpdateProgramId" value="' + id + '"></div></form>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Update');
            $('#universalModalYes').attr('value', 'UpdateProgram');
            break;
    
        case 'deleteProgram':
            $('#universalModalTitle').text('Delete a program');
            $('#universalModalBody').html('<input type="hidden" id="DeleteProgramId" value="' + id + '"><p>Do you want to delete the program: '+
            $('#program-list').children().eq(id-1).find('h1').text() + ' ?</p>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Delete');
            $('#universalModalYes').attr('value', 'DeleteProgram');
            break;
            
        case 'addExercise':
            $('#universalModalTitle').text('Add an exercise');
            $('#universalModalBody').html('<form><div class="mb-3"><label for="AddExerciseName" class="col-form-label">Exercise name:</label>'+
            '<input type="text" class="form-control" id="AddExerciseName"><label for="AddExerciseSerie" class="col-form-label">Exercise serie:</label>'+
            '<input type="number" class="form-control" id="AddExerciseSerie"><label for="AddExerciseRepetition" class="col-form-label">Exercise repetition:</label>'+
            '<input type="number" class="form-control" id="AddExerciseRepetition"><label for="AddExerciseDescription" class="col-form-label">Exercise description:</label>' +
            '<textarea name="AddExerciseDescription" rows="10" cols="45"></textarea><input type="hidden" id="AddExerciseProgramId" value="' + id + '"></div></form>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Add');
            $('#universalModalYes').attr('value', 'AddExercise');

        // TODO: Récupérer les données de l'exercice et les afficher dans les champs
        case 'updateExercise':
            $('#universalModalTitle').text('Update an exercise');
            $('#universalModalBody').html('<form><div class="mb-3"><label for="UpdateExerciseName" class="col-form-label">Exercise name:</label>'+
            '<input type="text" class="form-control" id="UpdateExerciseName" value="'+ id + '"><label for="UpdateExerciseSerie" class="col-form-label">Exercise serie:</label>'+
            '<input type="number" class="form-control" id="UpdateExerciseSerie" value="' + id + '"><label for="UpdateExerciseRepetition" class="col-form-label">Exercise repetition:</label>'+
            '<input type="number" class="form-control" id="UpdateExerciseRepetition" value="' + id + '"><label for="UpdateExerciseDescription" class="col-form-label">Exercise description:</label>' +
            '<textarea name="UpdateExerciseDescription" rows="10" cols="45">' + id + '</textarea><input type="hidden" id="UpdateExerciseId" value="' + id + '"></div></form>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Update');
            $('#universalModalYes').attr('value', 'UpdateExercise');

        case 'deleteExercise':
            $('#universalModalTitle').text('Delete an exercise');
            $('#universalModalBody').html('<input type="hidden" id="DeleteExerciseId" value="' + id + '"><p>Do you want to delete the exercise: '+
            $('#program-list').children().eq(id-1).find('h1').text() + ' ?</p>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Delete');
            $('#universalModalYes').attr('value', 'DeleteExercise');
            break;

        default:
            break;
    }
});
  
$('#universalModalYes').click('button', () => {
    switch ($('#universalModalYes').attr('value')) {
        case 'AddProgram':
            let addProgramName = $('#AddProgramName').val();
            let addProgramData = 'name=' + addProgramName;
            ajaxRequest('POST', '../php/request.php/program', () => {
                ajaxRequest('GET', '../php/request.php/program', showPrograms); 
            }, addProgramData);
            $('#universalModal').modal('hide');
            break;
        
        case 'UpdateProgram':
            let updateProgramName = $('#UpdateProgramName').val();
            let updateProgramId = $('#UpdateProgramId').val();
            ajaxRequest('PUT', '../php/request.php/program/' + updateProgramId, () => {
                ajaxRequest('GET', '../php/request.php/program', showPrograms); 
            }, 'name=' + updateProgramName);
            $('#universalModal').modal('hide');
            break;

        case 'DeleteProgram':
            let deleteProgramId = $('#DeleteProgramId').val();
            console.log(deleteProgramId);
            ajaxRequest('DELETE', '../php/request.php/program/' + deleteProgramId, () => {
                ajaxRequest('GET', '../php/request.php/program', showPrograms); 
            });
            $('#universalModal').modal('hide');
            break;

        case 'AddExercise':
            let addExerciseName = $('#AddExerciseName').val();
            let addExerciseSerie = $('#AddExerciseSerie').val();
            let addExerciseRepetition = $('#AddExerciseRepetition').val();
            let addExerciseDescription = $('#AddExerciseDescription').val();
            let addExerciseProgramId = $('#AddExerciseProgramId').val();
            let addExerciseData = 'name=' + addExerciseName + '&serie=' + addExerciseSerie + '&repetition=' + addExerciseRepetition 
            + '&description=' + addExerciseDescription + '&id_program=' + addExerciseProgramId;
            ajaxRequest('POST', '../php/request.php/exercise', showExercises, addExerciseData);
            $('#universalModal').modal('hide');
            break;

        case 'UpdateExercise':
        case 'DeleteExercise':
        default:
            break;
    }
});