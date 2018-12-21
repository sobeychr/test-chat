<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Message extends BaseController
{
    public function get():string
    {
        $arr = [
            [
                'userid' => 1,
                'text'   => 'testing',
                'time'   => time(),
            ]
        ];

        //return json_encode($arr);
        return 'test';
    }
}
