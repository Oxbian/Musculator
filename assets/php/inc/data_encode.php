<?php

header('Content-Type: text/plain; charset=utf-8');
header('Cache-control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

function sendJsonData($data, $code)
{
  if ($code == 200) {
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
  } else if ($code == 201) {
    header('HTTP/1.1 201 CREATED');
  }
  exit;
}

function sendError($code)
{
  if ($code == 400) {
    header('HTTP/1.1 400 Bad Request');
  } else if ($code == 401) {
    header('HTTP/1.1 401 Unauthorized');
  } else if ($code == 404) {
    header('HTTP/1.1 404 Not Found');
  } else if ($code == 500) {
    header('HTTP/1.1 500 Internal Server Error');
  }
  exit;
}
