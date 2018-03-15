<?php

require_once "config.php";

$statusCode = 201;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];

    $sql = 'INSERT INTO demo(name) VALUES (\''.$mysqli->real_escape_string($name).'\')';
    $mysqli->query($sql);
    $insertId = $mysqli->insert_id;

    echo json_encode([
        'id' => $insertId,
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
