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
            '<input type="text" class="form-control" id="UpdateProgramName" value="' + $('#program-list').children().eq(id-1).find('h1').text() +
            '"><input type="hidden" id="UpdateProgramId" value="' + id + '"></div></form>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Update');
            $('#universalModalYes').attr('value', 'UpdateProgram');
            break;
    
        case 'deleteProgram':
            $('#universalModalTitle').text('Delete a program');
            $('#universalModalBody').html('<input type="hidden" id="UpdateProgramId" value="' + id + '"><p>Do you want to delete the program: '+
            $('#program-list').children().eq(id-1).find('h1').text() + ' ?</p>');
            $('#universalModalNo').text('Cancel');
            $('#universalModalYes').text('Delete');
            $('#universalModalYes').attr('value', 'DeleteProgram');
            break;
            
      default:
          break;
    }
  });
  
  
  $('#universalModalYes').click('button', () => {
      switch ($('#universalModalYes').attr('value')) {
          case 'AddProgram':
              let addName = $('#AddProgramName').val();
              let addData = 'name=' + addName;
              ajaxRequest('POST', '../php/request.php/program', showPrograms, addData);
              $('#universalModal').modal('hide');
              break;
          
          case 'UpdateProgram':
              let updateName = $('#UpdateProgramName').val();
              let updateId = $('#UpdateProgramId').val();
              let updateData = 'name=' + updateName + '&id=' + updateId;
              ajaxRequest('PUT', '../php/request.php/program', showPrograms, updateData);
              $('#universalModal').modal('hide');
              break;
  
          case 'DeleteProgram':
              let deleteId = $('#UpdateProgramId').val();
              let deleteData = 'id=' + deleteId;
              ajaxRequest('DELETE', '../php/request.php/program', showPrograms, deleteData);
              $('#universalModal').modal('hide');
              break;
      }
  });