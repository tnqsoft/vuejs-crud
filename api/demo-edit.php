<?php

require_once "config.php";

$statusCode = 200;

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $raw = json_decode(file_get_contents("php://input"), true);

    $id = $raw['id'];
    $name = $raw['name'];

    $sql = 'UPDATE demo SET name = \''.$mysqli->real_escape_string($name).'\' WHERE id = '.$id;
    $mysqli->query($sql);

    echo json_encode([
        'id' => $id,
        'name' => $name,
    ]);
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
