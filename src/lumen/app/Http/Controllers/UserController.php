<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DataController as DataController;

class UserController extends DataController
{
    //const FILEPATH = './../../data/user.json';
    const FILEPATH = './../../data/user-init.json';

    //protected $filepath = './../../data/user.json';
    protected $filepath = './../../data/user-init.json';

    // FROM PARENT CLASS
    // public function get():array
    // protected function getFile():array
}
