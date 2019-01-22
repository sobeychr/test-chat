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

        $params = [
            'limit'      => '[/{limit:\d+}]',
            'limit_sort' => '[/{limit:\d+}[/{sort:asc|desc}]]',
            'sort'       => '[/{sort:asc|desc}]',
        ];

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

        // Handles cache
        $router->group(['prefix' => 'cache'], function() use ($router) {
            $router->get('/',      'CacheController@list');
            $router->get('/clear', 'CacheController@clear');
        });

        // Handles messages
        $router->group(['prefix' => 'message'], function() use ($router, $params, $regexps, $userfields) {
            $router->get('/list'.$params['limit_sort'], 'MessageController@list');
            
            // Loads message list
            $router->get('/after/{dateString:' .$regexps['date'].'}'.$params['limit'], 'MessageController@after');
            $router->get('/before/{dateString:'.$regexps['date'].'}'.$params['limit'], 'MessageController@before');
            $router->get('/between/{start:'.$regexps['date'].'}/{end:'.$regexps['date'].'}'.$params['limit_sort'], 'MessageController@between');
            $router->get('/from/{id:'.$regexps['int'].'}'.$params['limit_sort'], 'MessageController@from');
            $router->get('/has/{text:'.$regexps['search'].'}'.$params['limit_sort'], 'MessageController@has');

            // Loads data from a Message
            $router->group(['prefix' => '{id:'.$regexps['int'].'}'], function() use ($router, $userfields) {
                $router->get('/', 'MessageController@id');
                $router->get('/text', 'MessageController@text');

                $router->group(['prefix' => 'user'], function() use ($router, $userfields) {
                    $router->get('/', 'MessageController@user');
                    $router->get('/{field:'.implode('|', $userfields).'}', 'MessageController@userField');
                });
            });
            
            // Registers a new Message
            $router->get('/new', 'MessageController@post');
            /*
            $router->post('/new', 'MessageController@post');
            $router->options('/new', function() {
                return response()->json([], 206);
            });
            */
        });

        // Handles users
        $router->group(['prefix' => 'user'], function() use ($router, $params, $regexps, $userfields) {
            $router->get('/list'.$params['limit_sort'], 'UserController@list');
            $router->get('/{status:online|offline}'.$params['limit_sort'], 'UserController@status');

            $router->group(['prefix' => '{id:'.$regexps['int'].'}'], function() use ($router, $userfields) {
                $router->get('/', 'UserController@id');
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
