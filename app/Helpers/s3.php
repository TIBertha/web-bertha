<?php

use App\Facades\S3Uploader;

function saveImageToS3($base64)
{
    if (!$base64 || !str_contains($base64, ',')) {
        return null;
    }

    [$meta, $data] = explode(',', $base64);

    $file = base64_decode($data);

    if (!$file) {
        return null;
    }

    $folder = 'Adjuntos/';
    $fileName = time() . '.jpeg';

    S3Uploader::put($folder . $fileName, $file, 'public');

    return S3Uploader::url($folder. $fileName);
}
