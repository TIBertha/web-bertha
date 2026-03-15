<?php

function cleanPass(){
    session()->forget('getPass');
}

foreach (glob(__DIR__ . '/*.php') as $file) {
    require_once $file;
}

