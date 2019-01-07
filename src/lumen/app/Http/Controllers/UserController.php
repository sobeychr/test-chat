<?php

namespace App\Http\Controllers;

use App\Datafilters\FilterMatch;
use Illuminate\Http\Request;

class UserController extends DataController
{
    private const STATUS_OFFLINE = 0;
    private const STATUS_ONLINE  = 1;
    private const ONLINE_STRING = 'online';

    //protected $filepath = './../../data/user.json';
    //protected $filepath = './../../data/user-init.json';
    protected $filename = 'user-generated-{id}';

    protected $ascFields = ['id', 'name'];
    protected $returnLimit = 50;

    /*
    // Various search via API
    public function avatar(int $id):array    { return $this->find(['avatar' => $id]);   }
    public function id(int $id):array        { return $this->find(['id' => $id], true); }
    public function name(string $name):array { return $this->contain(['name' => $name]);   }

    public function online():array  { return $this->find(['status' => 1]);  }
    public function offline():array { return $this->find(['status' => 0]); }
    */
    
    public function id(int $id):array
    {
        $this->dataOutput = DataController::DATA_SINGLE;
        $this->filters[] = new FilterMatch('id', $id);
        return $this->get();
    }

    public function list(int $limit=0, string $sort='asc'):array
    {
        $this->dataOutput = DataController::DATA_LIST;
        $this->registerLimitSort($limit, $sort);
        return $this->get();
    }

    public function status(string $status, int $limit=0, string $sort='asc'):array
    {
        $this->dataOutput = DataController::DATA_LIST;
        $this->registerLimitSort($limit, $sort);

        $status = $status === self::ONLINE_STRING
                ? self::STATUS_ONLINE
                : self::STATUS_OFFLINE;

        $this->filters[] = new FilterMatch('status', $status);
        return $this->get();
    }
}
