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
        $userfields = [
            'id', 'name', 'avatar', 'status',
            'x', 'y', 'width', 'height',
        ];

        // Loads messages and users
        //$router->get('/init',  'InitController@get');

        // Handles messages
        $router->group(['prefix' => 'message'], function() use ($router, $params, $regexps, $userfields) {
            $router->get('/list'.$params, 'MessageController@list');
            $router->get('/from/{id:'.$regexps['int'].'}'.$params, 'MessageController@from');

            $router->group(['prefix' => '{id:'.$regexps['int'].'}'], function() use ($router, $userfields) {
                $router->get('/', 'MessageController@id');

                $router->get('/text', 'MessageController@text');

                $router->group(['prefix' => 'user'], function() use ($router, $userfields) {
                    $router->get('/', 'MessageController@user');

                    $router->get('/{field:'.implode('|', $userfields).'}', 'MessageController@userField');
                });
            });
            

            /*
            $router->post('/new', 'MessageController@post');
            $router->options('/new', function() {
                return response()->json([], 206);
            });
            */

            /*
            $router->get('/id/{id:' . $regexps['int'] . '}', 'MessageController@id');
            $router->get('/from/{id:' . $regexps['int'] . '}', 'MessageController@id');
            $router->get('/after/{dateString:' .  $regexps['date'] . '}', 'MessageController@after');
            $router->get('/before/{dateString:' . $regexps['date'] . '}', 'MessageController@before');
            $router->get('/between/{start:' . $regexps['date'] . '}/{end:' . $regexps['date'] . '}', 'MessageController@between');
            $router->get('/has/{text:' . $regexps['search'] . '}', 'MessageController@has');
            */
        });

        // Handles users
        $router->group(['prefix' => 'user'], function() use ($router, $params, $regexps, $userfields) {
            $router->get('/list'.$params, 'UserController@list');

            $router->get('/{status:online|offline}'.$params, 'UserController@status');

            $router->group(['prefix' => '{id:'.$regexps['int'].'}'], function() use ($router, $userfields) {
                $router->get('/', 'UserController@id');

                $fields = ['id', 'name', 'avatar', 'status', 'x', 'y', 'width', 'height'];
                $router->get('/{field:'.implode('|', $userfields).'}', 'UserController@field');
            });
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
