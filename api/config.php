<?php

$mysqli = new mysqli("localhost", "root", "123456", "vuejscrud");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
}
$mysqli->set_charset("utf8");
