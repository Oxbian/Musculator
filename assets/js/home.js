/* eslint-disable no-undef */

function loadGraph(data) {
  $('#add-session').html(`<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSessionModal">
  Add session</button>`);

  const xyValues = [
    {x: 50, y: 7},
    {x: 60, y: 8},
    {x: 70, y: 8},
    {x: 80, y: 9},
    {x: 90, y: 9},
    {x: 100, y: 9},
    {x: 110, y: 10},
    {x: 120, y: 11},
    {x: 130, y: 14},
    {x: 140, y: 14},
    {x: 150, y: 15}
  ];

  new Chart("exercise-graph", {
    type: "scatter",
    data: {
      datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgba(0,0,255,1)",
        data: xyValues
      }]
    },
    options: {}
  });
}

function showExercises(data) {
  // Append each exercise to it's program
  data.forEach((element) => {
    $(`#program${element.id_program}`).append(`<a class="btn btn-secondary m-2" id="exercise" value="${element.id}">${element.name}</a>`);

    $('#exercise').click('a', (e) => {
      const id = $(e.target).attr('value');
      ajaxRequest('GET', '../php/request.php/session', loadGraph, `id_exercise=${id}`);
    });
  });
}

function showPrograms(data) {
  $('#exercise-list').html(''); // clear the list

  // Append each program to the list
  data.forEach((element) => {
    $('#exercise-list').append(`<h4 id="program${element.id}" class="text-light d-flex flex-column mb-3"><strong>${element.name}</strong></h4>`);
    ajaxRequest('GET', '../php/request.php/exercise', showExercises, `id_program=${element.id}`);
  });
}

ajaxRequest('GET', '../php/request.php/program', showPrograms);
