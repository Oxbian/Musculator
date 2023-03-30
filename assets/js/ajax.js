'use strict';

// Perform an ajaxRequest
function ajaxRequest(type, url, callback, data = null)
{
    // Create XML HTTP Request
    let xhr = new XMLHttpRequest();
    if (type == 'GET' && data != null) {
        url += '?' + data;
    }
    xhr.open(type, url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Add onload function
    xhr.onload = () => {
        switch (xhr.status) {
            case 200:
            case 201:
                console.log(xhr.responseText);
                if (xhr.responseText != '[]')
                    callback(JSON.parse(xhr.responseText));
                break;

            default:
                httpErrors(xhr.status);
                break;
        }
    };
    // Send the XML HTTP Request
    xhr.send(data);
}

// Display an error message accordingly to an error code
function httpErrors(errorCode) 
{
    let messages = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
    };

    // Display error
    if (errorCode in messages) {
        $('#errors').html('<strong>' + messages[errorCode] + '</strong>');
        $('#errors').show();
    }

}