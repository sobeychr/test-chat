<?php

namespace App\Http\Controllers;

use App\Data\Filter\FilterMatch;

class UserController extends DataController
{
    private const STATUS_OFFLINE = 0;
    private const STATUS_ONLINE  = 1;
    private const ONLINE_STRING = 'online';

    protected $filename = 'user-generated-{id}';
    protected $sorts = ['name'];
    protected $returnLimit = 50;

    public function list(int $limit=0, string $sort='asc'):array
    {
        $this->output = DataController::OUTPUT_LIST;
        $this->registerLimitSort($limit, $sort);
        return $this->get();
    }

    public function status(string $status, int $limit=0, string $sort='asc'):array
    {
        $this->output = DataController::OUTPUT_LIST;
        $this->registerLimitSort($limit, $sort);

        $status = $status === self::ONLINE_STRING
                ? self::STATUS_ONLINE
                : self::STATUS_OFFLINE;

        $this->filters[] = new FilterMatch('status', $status);
        return $this->get();
    }
}
