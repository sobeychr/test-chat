<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/version', function () use ($router) {
    return $router->app->version();
});

$router->group(['middleware' => ['json', 'cors']],
    function() use ($router) {

        // Loads messages and users
        $router->get('/init',  'InitController@get');

        // Handles messages
        $router->get('/message', 'MessageController@get');
        $router->options('/message', function(){
            return response()->json([], 206);
        });
        $router->post('/message', 'MessageController@post');

        // Handles users
        $router->get('/user', 'UserController@get');
    }
);
