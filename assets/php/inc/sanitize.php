<?php 

function sanitize_strint($int) {
    $int = htmlspecialchars($int);
    return strval($int);
}

function sanitize_string($string) {
    return htmlspecialchars($string);
}

?>