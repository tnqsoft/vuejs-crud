<?php

require_once "config.php";

$statusCode = 204;

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $id = $_GET['id'];

    $sql = 'DELETE FROM demo WHERE id = '.$id;
    $mysqli->query($sql);
} else {
    $statusCode = 405;
    echo json_encode([
        'code' => 405,
        'error' => 'Method Not Allowed',
    ]);
}

$mysqli->close();

header('Content-type: application/json');
http_response_code($statusCode);
