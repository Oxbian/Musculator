<?php

require_once('inc/database.php');

function authentification($db)
{
    $login = $_SERVER['PHP_AUTH_USER'];
    $password = $_SERVER['PHP_AUTH_PW'];

    if (dbCheckUser($db, $login, $password)) {
        $token = base64_encode(openssl_random_pseudo_bytes(20));
        if (dbAddToken($db, $token, $login)) {
            header('Content-Type: application/json; charset=utf-8');
            header('Cache-control: no-store, no-cache, must-revalidate');
            header('Pragma: no-cache');
            echo($token);
            exit;
        } else {
            header('HTTP/1.1 500 Internal Server Error');
        }
    } else {
        header('HTTP/1.1 401 Unauthorized');
    }
}

function verifyToken($db)
{
    $headers = getallheaders();
    $token = $headers['Authorization'];
    if (preg_match('/Bearer (.*)/', $token, $tab)) {
        $token = $tab[1];
    }

    $login = dbVerifyToken($db, $token);
    if ($login)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-control: no-store, no-cache, must-revalidate');
        header('Pragma: no-cache');
        echo($token);
    } else {
        header('HTTP/1.1 401 Unauthorized');
    }
}

?>