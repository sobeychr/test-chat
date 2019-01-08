<?php

namespace App\Http\Controllers;

use App\Datafilters\{FilterBetween, FilterGreaterEqual, FilterLowerEqual, FilterMatch};

class MessageController extends DataController
{
    private const FIELD_TEXT = 'text';
    private const FIELD_TIME = 'time';
    private const FIELD_USER = 'userid';

    protected $filename = 'message-generated-{id}';
    protected $sorts = [self::FIELD_TIME];
    protected $returnLimit = 50;

    public function after(string $dateString, int $limit=0):array
    {
        $this->dataOutput = DataController::DATA_LIST;
        $this->registerLimitSort($limit);
        $this->filters[] = new FilterGreaterEqual(
            self::FIELD_TIME,
            $this->parseDateString($dateString)
        );
        return $this->get();
    }

    public function before(string $dateString, int $limit=0):array
    {
        $this->dataOutput = DataController::DATA_LIST;
        $this->registerLimitSort($limit);
        $this->filters[] = new FilterLowerEqual(
            self::FIELD_TIME,
            $this->parseDateString($dateString)
        );
        return $this->get();
    }

    public function between(string $start, string $end, int $limit=0, string $sort='asc'):array
    {
        $this->dataOutput = DataController::DATA_LIST;
        $this->registerLimitSort($limit, $sort);
        $this->filters[] = new FilterBetween(
            self::FIELD_TIME,
            $this->parseDateString($start),
            $this->parseDateString($end)
        );
        return $this->get();
    }

    public function from(int $id, int $limit=0, string $sort='asc'):array
    {
        $this->dataOutput = DataController::DATA_LIST;
        $this->registerLimitSort($limit, $sort);
        $this->filters[] = new FilterMatch(self::FIELD_USER, $id);
        return $this->get();
    }

    public function list(int $limit=0, string $sort='asc'):array
    {
        $this->dataOutput = DataController::DATA_LIST;
        $this->registerLimitSort($limit, $sort);
        return $this->get();
    }

    public function text(int $id):array
    {
        return $this->field($id, self::FIELD_TEXT);
    }

    public function user(int $id):array
    {
        $data = $this->id($id);
        $userid = $data[self::FIELD_USER] ?? 0;
        if(!$userid) {
            return [];
        }
        return app('App\Http\Controllers\UserController')->id($userid);
    }

    public function userField(int $id, string $field):string
    {
       $user = $this->user($id);
       return $user[$field] ?? '';
    }

    // Various search via API
    /*
    public function id(int $id):array   { return $this->find(['id' => $id], true); }
    public function from(int $id):array { return $this->find(['userid' => $id]); }

    public function after(string $dateString):array  { return $this->greaterEqual( ['time' => $this->parseDateString($dateString)]); }
    public function before(string $dateString):array { return $this->lowerEqual(   ['time' => $this->parseDateString($dateString)]); }
    public function between(string $start, string $end):array
    {
        return $this->filterBetween(
            'time',
            $this->parseDateString($start),
            $this->parseDateString($end)
        );
    }
    public function has(string $text):array { return $this->contain(['text' => $text]); }
    */

    /**
     * Enters a new message entry and returns the list as JSON string
     * @param int $userid [UserID submitting the new message]
     * @param string $text [Entry of the message]
     * @return string [Messages as JSON string]
     */
    /*
    public function post(\Illuminate\Http\Request $request):string
    {
        $data = $request->all();

        $file = $this->getFile();
        $file[] = [
            'userid' => $data['userid'] ?? 0,
            'text'   => $data['text'] ?? '',
            'time'   => time(),
        ];

        return $file;
    }
    */
}
