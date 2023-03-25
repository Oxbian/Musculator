<?php 

function sanitize_strint($int) {
    $int = htmlspecialchars($int, ENT_QUOTES, 'UTF-8');
    return strval($int);
}

function sanitize_string($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

?>