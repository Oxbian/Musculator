'use strict';

function showPrograms(data)
{
    $('#exercise-list').html(''); // clear the list

    // Append each program to the list
    data.forEach(element => {
        $('#exercise-list').append('<h4 id="program' + element.id + '" class="text-light"><strong>' + element.name + '</strong></h4>');
        ajaxRequest('GET', '../php/request.php/exercise', showExercises, 'id_program=' + element.id);
    });
}

function showExercises(data)
{
    // Append each exercise to it's program
    data.forEach(element => {
        $('#program'+element.id_program).append('<a class="nav-link link-light" id="exercise" value="' + element.id + '">' + element.name + '</a>');

        $('#exercise').click('a', () => {
            let id = $(event.target).attr('value');
            ajaxRequest('GET', '../php/request.php/session', loadGraph, 'id_exercise=' + id); 
        });
    });
}

function loadGraph(data)
{
    console.log(data);
}



ajaxRequest('GET', '../php/request.php/program', showPrograms);