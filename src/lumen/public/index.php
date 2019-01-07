<?php

if(!defined('PATH_ROOT'))   define('PATH_ROOT',   realpath(__DIR__ . './../') . DIRECTORY_SEPARATOR);

if(!defined('PATH_DATA'))   define('PATH_DATA',   realpath(PATH_ROOT . './../data/') . DIRECTORY_SEPARATOR);
if(!defined('PATH_IMAGE'))  define('PATH_IMAGE',  realpath(PATH_ROOT . './../image/') . DIRECTORY_SEPARATOR);
if(!defined('PATH_PUBLIC')) define('PATH_PUBLIC', PATH_ROOT . 'public' . DIRECTORY_SEPARATOR);

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| First we need to get an application instance. This creates an instance
| of the application / container and bootstraps the application so it
| is ready to receive HTTP / Console requests from the environment.
|
*/

$app = require __DIR__.'/../bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

$app->run();
