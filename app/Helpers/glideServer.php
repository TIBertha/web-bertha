<?php

use League\Glide\ServerFactory;

function glideServer() {
    return ServerFactory::create([
        'source' => storage_path('app/public'),
        'cache' => storage_path('app/public/cache'),
        'base_url' => 'img',
    ]);
}
