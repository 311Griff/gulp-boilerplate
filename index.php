<?php

//delete me when connecting to v2
if ($_SERVER['REQUEST_URI'] === '/examples') {
    require_once 'pages/examples.php';
} else {
    require_once 'pages/index.php';
}

//require_once __DIR__ . '/../../index.php'; //connect to v2