<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends DataController
{
    //protected $filepath = './../../data/user.json';
    protected $filepath = './../../data/user-init.json';

    // FROM PARENT CLASS
    // public function get():array
    // protected function getFile():array
    // protected function find(array $search, bool $single=false):array
    
    // Various search via API
    public function avatar(int $id):array    { return $this->find(['avatar' => $id]);   }
    public function id(int $id):array        { return $this->find(['id' => $id], true); }
    public function name(string $name):array { return $this->contain(['name' => $name]);   }

    public function online():array  { return $this->find(['status' => 1]);  }
    public function offline():array { return $this->find(['status' => 0]); }
}
