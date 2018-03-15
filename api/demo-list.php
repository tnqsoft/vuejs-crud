<?php

require_once "config.php";

$statusCode = 200;

$list = [];
if ($result = $mysqli->query("SELECT * FROM demo")) {
    while ($obj = $result->fetch_object()) {
        $list[] = $obj;
    }
    $result->close();
}

echo json_encode($list);

$mysqli->close();

header('Content-type: application/json');
http_response_code($statusCode);
