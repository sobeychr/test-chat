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

        $regexps = [
            'id'     => '\d+',
            'date'   => '[\d\-]+',
            'search' => '[\d\w\-]+',
            'word'   => '\w+',
        ];

        // Loads messages and users
        $router->get('/init',  'InitController@get');

        // Handles messages
        $router->group(['prefix' => 'message'], function() use ($router, $regexps) {
            $router->get('/',  'MessageController@get');

            $router->post('/new', 'MessageController@post');
            $router->options('/new', function() {
                return response()->json([], 206);
            });

            $router->get('/id/{id:' . $regexps['id'] . '}', 'MessageController@id');
            $router->get('/from/{id:' . $regexps['id'] . '}', 'MessageController@id');
            $router->get('/after/{dateString:' .  $regexps['date'] . '}', 'MessageController@after');
            $router->get('/before/{dateString:' . $regexps['date'] . '}', 'MessageController@before');
            $router->get('/between/{start:' . $regexps['date'] . '}/{end:' . $regexps['date'] . '}', 'MessageController@between');
            $router->get('/has/{text:' . $regexps['search'] . '}', 'MessageController@has');
        });

        // Handles users
        $router->group(['prefix' => 'user'], function() use ($router, $regexps) {
            $router->get('/', 'UserController@get');

            $router->get('/offline', 'UserController@offline');
            $router->get('/online',  'UserController@online');

            $router->get('/avatar/{id:' . $regexps['id']   . '}', 'UserController@avatar');
            $router->get('/name/{name:' . $regexps['word'] . '}', 'UserController@name');
        });
    }
);
