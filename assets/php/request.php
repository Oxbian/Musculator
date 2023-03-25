<?php

require_once('database.php'); // All the database functions
require_once('inc/authentification.php'); // All the token functions
require_once('inc/data_encode.php'); // All the data & error functions
//require_once('inc/debug.php'); // Debug functions

$db = dbConnect();

if (!$db) {
    sendError(500);
}

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);

if ($requestRessource == 'authentification') {
    authentification($db);
} else if ($requestRessource == 'verifyToken') {
    verifyToken($db);
}

$login = 'test'; // TEMPORARY

//echo $requestRessource; // DEBUG

if ($requestRessource == 'program') {
    switch ($requestMethod) {
        case 'GET':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;
                
                if ($id != NULL) {
                    // Get the program of the specified id
                    $data = dbRequestProgram($db, $id, $login);
                    if ($data != NULL) {
                        sendJsonData($data, 200);
                    } else {
                        sendError(404);
                    }
                } else {
                    // Get all the programs of the user
                    $data = dbRequestPrograms($db, $login);
                    if ($data != NULL) {
                        sendJsonData($data, 200);
                    } else {
                        sendError(404);
                    }
                }
            } else {
                sendError(401);
            }
            break;

        case 'POST':
            if ($login != NULL) {
                if (isset($_POST['name'])) {
                    // Add a program
                    $data = dbAddProgram($db, $_POST['name'], $login);
                    if ($data == false) {
                        sendError(400);
                    } else {
                        sendJsonData($data, 201);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;

        case 'PUT':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;
        
                if ($id != NULL) {
                    parse_str(file_get_contents("php://input"), $_PUT);
                    if (isset($_PUT['name']) && empty($_PUT['name']) == false) {
                        // Modify the program of the specified id
                        $data = dbModifyProgram($db, $id, $_POST['name'], $login);
                        if ($data == false) {
                            sendError(400);
                        } else {
                            sendJsonData($data, 200);
                        }
                    } else {
                        sendError(400);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;

        case 'DELETE':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;
        
                if ($id != NULL) {
                    // Delete the program of the specified id
                    $data = dbDeleteProgram($db, $id, $login);
                    if ($data == false) {
                        sendError(400);
                    } else {
                        sendJsonData($data, 200);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;

        default:
            sendError(400);
            break;
    }
}

if ($requestRessource == 'exercise') {
    switch ($requestMethod) {
        case 'GET':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;

                if ($id != NULL) {
                    // Get the specified exercise
                    $data = dbRequestExercise($db, $id, $login);
                    if ($data != NULL) {
                        sendJsonData($data, 200);
                    } else {
                        sendError(404);
                    }
                } else {
                    // Get all the exercise of a program
                    if (isset($_GET['id_program'])) {
                        $data = dbRequestExercises($db, $_GET['id_program'], $login);
                        if ($data != NULL) {
                            sendJsonData($data, 200);
                        } else {
                            sendError(404);
                        }
                    } else {
                        sendError(400);
                    }
                }
            } else {
                sendError(401);
            }
            break;

        case 'POST':
            if ($login != NULL) {
                if (isset($_POST['name']) && isset($_POST['serie']) && isset($_POST['repetition']) && 
                 isset($_POST['description']) && isset($_POST['id_program'])) {
                    // Add an exercise
                    $data = dbAddExercise($db, $_POST['name'], $_POST['serie'], $_POST['repetition'], 
                     $_POST['description'], $_POST['id_program'], $login);
                    if ($data == false) {
                        sendError(400);
                    } else {
                        sendJsonData($data, 201);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;

        case 'PUT':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;
        
                if ($id != NULL) {
                    parse_str(file_get_contents("php://input"), $_PUT);

                    if (isset($_PUT['name']) && empty($_PUT['name']) == false &&
                     isset($_PUT['serie']) && empty($_PUT['serie']) == false &&
                     isset($_PUT['repetition']) && empty($_PUT['repetition']) == false &&
                     isset($_PUT['description']) && empty($_PUT['description']) == false &&
                     isset($_PUT['id_program']) && empty($_PUT['id_program']) == false) {
                        // Modify the exercise of the specified id
                        $data = dbModifyExercise($db, $_PUT['name'], $_PUT['serie'], $_PUT['repetition'],
                         $_PUT['description'], $_PUT['id_program'], $id, $login);
                        if ($data == false) {
                            sendError(400);
                        } else {
                            sendJsonData($data, 200);
                        }
                    } else {
                        sendError(400);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;

        case 'DELETE':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;
        
                if ($id != NULL) {
                    // Delete the exercise of the specified id
                    $data = dbDeleteExercise($db, $id, $login);
                    if ($data == false) {
                        sendError(400);
                    } else {
                        sendJsonData($data, 200);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;
            
        default:
            sendError(400);
            break;
    }
}

if ($requestRessource == 'session') {
    switch ($requestMethod) {
        case 'GET':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;

                if ($id != NULL) {
                    // Get the specified session
                    $data = dbRequestSession($db, $id, $login);
                    if ($data != NULL) {
                        sendJsonData($data, 200);
                    } else {
                        sendError(404);
                    }
                } else {
                    // Get all the sessions of an exercise
                    if (isset($_GET['id_exercise'])) {
                        $data = dbRequestSession($db, $_GET['id_exercise'], $login);
                        if ($data != NULL) {
                            sendJsonData($data, 200);
                        } else {
                            sendError(404);
                        }
                    } else {
                        sendError(400);
                    }
                }
            } else {
                sendError(401);
            }
            break;

        case 'POST':
            if ($login != NULL) {
                if (isset($_POST['repetition']) && isset($_POST['serie']) && isset($_POST['date']) && 
                 isset($_POST['id_exercise'])) {
                    // Add a session
                    $data = dbAddSession($db, $_POST['repetition'], $_POST['serie'], $_POST['date'], 
                     $_POST['id_exercise'], $login);
                    if ($data == false) {
                        sendError(400);
                    } else {
                        sendJsonData($data, 201);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;

        case 'PUT':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;
        
                if ($id != NULL) {
                    parse_str(file_get_contents("php://input"), $_PUT);

                    if (isset($_PUT['repetition']) && empty($_PUT['repetition']) == false &&
                     isset($_PUT['serie']) && empty($_PUT['serie']) == false &&
                     isset($_PUT['date']) && empty($_PUT['date']) == false &&
                     isset($_PUT['id_exercise']) && empty($_PUT['id_exercise']) == false) {
                        // Modify the session of the specified id
                        $data = dbModifySession($db, $_PUT['repetition'], $_PUT['serie'], $_PUT['date'],
                         $_PUT['id_exercise'], $id, $login);
                        if ($data == false) {
                            sendError(400);
                        } else {
                            sendJsonData($data, 200);
                        }
                    } else {
                        sendError(400);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;

        case 'DELETE':
            if ($login != NULL) {
                $id = array_shift($request);
                if ($id == '')
                    $id = NULL;
        
                if ($id != NULL) {
                    // Delete the session of the specified id
                    $data = dbDeleteSession($db, $id, $login);
                    if ($data == false) {
                        sendError(400);
                    } else {
                        sendJsonData($data, 200);
                    }
                } else {
                    sendError(400);
                }
            } else {
                sendError(401);
            }
            break;
            
        default:
            sendError(400);
            break;
    }
}