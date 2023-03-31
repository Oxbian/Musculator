'use strict';

$('#addProgram').on('click', () => {
    $('#universalModalTitle').text('Add a program');
    $('#universalModalBody').html('<form><div class="mb-3"><label for="AddProgramName" class="col-form-label">Program name:</label>'+
    '<input type="text" class="form-control" id="AddProgramName"></div></form>');
    $('#universalModalNo').text('Cancel');
    $('#universalModalYes').text('Add');
    $('#universalModalYes').attr('value', 'AddProgram');
    $('#universalModal').modal('show');
});

$('#program-list').on('click', '.editProgram', () => {
    $('#universalModalTitle').text('Edit a program');
    $('#universalModalBody').html('<form><div class="mb-3"><label for="UpdateProgramName" class="col-form-label">Program name:</label>'+
    '<input type="text" class="form-control" id="UpdateProgramName" value="' + $(event.target).closest('.program').find('h1').text() +
    '"><input type="hidden" id="UpdateProgramId" value="' + $(event.target).closest('.program').data('value') + '"></div></form>');
    $('#universalModalNo').text('Cancel');
    $('#universalModalYes').text('Update');
    $('#universalModalYes').attr('value', 'UpdateProgram');
    $('#universalModal').modal('show');
});

$('#program-list').on('click', '.deleteProgram', () => {
    $('#universalModalTitle').text('Delete a program');
    $('#universalModalBody').html('<input type="hidden" id="DeleteProgramId" value="' + $(event.target).closest('.program').data('value') + '"><p>Do you want to delete the program: '+
    $(event.target).closest('.program').find('h1').text() + ' ?</p>');
    $('#universalModalNo').text('Cancel');
    $('#universalModalYes').text('Delete');
    $('#universalModalYes').attr('value', 'DeleteProgram');
    $('#universalModal').modal('show');
});

$('#program-list').on('click', '.addExercise', () => {
    $('#universalModalTitle').text('Add an exercise');
    $('#universalModalBody').html('<form><div class="mb-3"><label for="AddExerciseName" class="col-form-label">Exercise name:</label>'+
    '<input type="text" class="form-control" id="AddExerciseName"><label for="AddExerciseSerie" class="col-form-label">Exercise serie:</label>'+
    '<input type="number" class="form-control" id="AddExerciseSerie"><label for="AddExerciseRepetition" class="col-form-label">Exercise repetition:</label>'+
    '<input type="number" class="form-control" id="AddExerciseRepetition"><label for="AddExerciseDescription" class="col-form-label">Exercise description:</label>' +
    '<textarea name="AddExerciseDescription" rows="10" cols="45"></textarea><input type="hidden" id="AddExerciseProgramId" value="' + $(event.target).closest('.program').data('value')
    + '"></div></form>');
    $('#universalModalNo').text('Cancel');
    $('#universalModalYes').text('Add');
    $('#universalModalYes').attr('value', 'AddExercise');
    $('#universalModal').modal('show');
});

$('#program-list').on('click', '.editExercise', () => {
    console.log($(event.target).closest('.exerciseName'));
    $('#universalModalTitle').text('Update an exercise');
    $('#universalModalBody').html('<form><div class="mb-3"><label for="UpdateExerciseName" class="col-form-label">Exercise name:</label>'+
    '<input type="text" class="form-control" id="UpdateExerciseName" value="'+ $(event.target).closest('.exerciseName').text() + '"><label for="UpdateExerciseSerie" class="col-form-label">Exercise serie:</label>'+
    '<input type="number" class="form-control" id="UpdateExerciseSerie" value="' + $(event.target).closest('.exerciseSerie').text() + '"><label for="UpdateExerciseRepetition" class="col-form-label">Exercise repetition:</label>'+
    '<input type="number" class="form-control" id="UpdateExerciseRepetition" value="' + $(event.target).closest('.exerciseRep').text() + '"><label for="UpdateExerciseDescription" class="col-form-label">Exercise description:</label>' +
    '<textarea name="UpdateExerciseDescription" rows="10" cols="45">' + $(event.target).closest('.exerciseDescription').text() + '</textarea><input type="hidden" id="UpdateExerciseId" value="' + $(event.target).closest('.editExercise').data('value') + 
    '"><input type="hidden" id="UpdateExerciseProgramId" value="' + $(event.target).closest('.program').data('value') + '"></div></form>');
    $('#universalModalNo').text('Cancel');
    $('#universalModalYes').text('Update');
    $('#universalModalYes').attr('value', 'UpdateExercise');    
    $('#universalModal').modal('show');
});

$('#program-list').on('click', '.deleteExercise', () => {
    $('#universalModalTitle').text('Delete an exercise');
    $('#universalModalBody').html('<input type="hidden" id="DeleteExerciseId" value="' + $(event.target).closest('.deleteExercise').data('value') + '"><p>Do you want to delete the exercise: '+
    $(event.target).closest('.deleteExercise').data('value') + ' ?</p><input type="hidden" id="DeleteExerciseProgramId" value="' + $(event.target).closest('.program').data('value') + '">');
    $('#universalModalNo').text('Cancel');
    $('#universalModalYes').text('Delete');
    $('#universalModalYes').attr('value', 'DeleteExercise');    
    $('#universalModal').modal('show');
});

$('#universalModalYes').click('button', () => {
    switch ($('#universalModalYes').attr('value')) {
        case 'AddProgram':
            let addProgramName = $('#AddProgramName').val();
            ajaxRequest('POST', '../php/request.php/program', () => {
                ajaxRequest('GET', '../php/request.php/program', showPrograms);
            }, 'name=' + addProgramName);
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
            console.log($('#AddExerciseDescription'));
            let addExerciseProgramId = $('#AddExerciseProgramId').val();
            let addExerciseData = 'name=' + addExerciseName + '&serie=' + addExerciseSerie + '&repetition=' + addExerciseRepetition 
            + '&description=' + addExerciseDescription + '&id_program=' + addExerciseProgramId;
            ajaxRequest('POST', '../php/request.php/exercise', () => {
                ajaxRequest('GET', '../php/request.php/exercise', showExercises, 'id_program=' + addExerciseProgramId);
            } , addExerciseData);
            $('#universalModal').modal('hide');
            break;

        case 'UpdateExercise':
            let updateExerciseName = $('#UpdateExerciseName').val();
            let updateExerciseSerie = $('#UpdateExerciseSerie').val();
            let updateExerciseRepetition = $('#UpdateExerciseRepetition').val();
            let updateExerciseDescription = $('#UpdateExerciseDescription').val();
            let updateExerciseId = $('#UpdateExerciseId').val();
            let updateExerciseProgramId = $('#UpdateExerciseProgramId').val();
            let updateExerciseData = 'name=' + updateExerciseName + '&serie=' + updateExerciseSerie + '&repetition=' + updateExerciseRepetition
            + '&description=' + updateExerciseDescription + '&id_program=' + updateExerciseProgramId;
            ajaxRequest('PUT', '../php/request.php/exercise/' + updateExerciseId, () => {
                ajaxRequest('GET', '../php/request.php/exercise', showExercises, 'id_program=' + updateExerciseProgramId);
            }, updateExerciseData);
            $('#universalModal').modal('hide');
            break;

        case 'DeleteExercise':
            let deleteExerciseId = $('#DeleteExerciseId').val();
            let deleteExerciseProgramId = $('#DeleteExerciseProgramId').val();
            ajaxRequest('DELETE', '../php/request.php/exercise/' + deleteExerciseId, () => {    
                ajaxRequest('GET', '../php/request.php/exercise', showExercises, 'id_program=' + deleteExerciseProgramId);
            });
        default:
            break;
    }
});