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

        $params  = '[/{limit:\d+}[/{sort:asc|desc}]]';
        $regexps = [
            'int'     => '\d+',
            'date'   => '[\d\-]+',
            'search' => '[\d\w\-]+',
            'word'   => '\w+',
        ];

        // Loads messages and users
        $router->get('/init',  'InitController@get');

        // Handles messages
        $router->group(['prefix' => 'message'], function() use ($router, $regexps) {
            //$router->get('/',  'MessageController@get');

            /*
            $router->post('/new', 'MessageController@post');
            $router->options('/new', function() {
                return response()->json([], 206);
            });

            $router->get('/id/{id:' . $regexps['int'] . '}', 'MessageController@id');
            $router->get('/from/{id:' . $regexps['int'] . '}', 'MessageController@id');
            $router->get('/after/{dateString:' .  $regexps['date'] . '}', 'MessageController@after');
            $router->get('/before/{dateString:' . $regexps['date'] . '}', 'MessageController@before');
            $router->get('/between/{start:' . $regexps['date'] . '}/{end:' . $regexps['date'] . '}', 'MessageController@between');
            $router->get('/has/{text:' . $regexps['search'] . '}', 'MessageController@has');
            */
        });

        // Handles users
        $router->group(['prefix' => 'user'], function() use ($router, $regexps, $params) {
            $router->get('/list' . $params, 'UserController@list');

            $router->get('/{status:online|offline}' . $params, 'UserController@status');

            $router->get('/{id:' . $regexps['int'] . '}', 'UserController@id');

            /*
            $router->get('/avatar/{id:' . $regexps['int']   . '}', 'UserController@avatar');
            $router->get('/name/{name:' . $regexps['word'] . '}', 'UserController@name');
            */
        });

        // Handles random generated content
        /*
        $router->group(['prefix' => 'generate'], function() use ($router) {
            $router->get('/message', 'GenerateController@message');
            $router->get('/user', 'GenerateController@user');
        });
        */
    }
);
