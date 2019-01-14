<?php

namespace App\Http\Controllers;

use App\Data\Filter\{FilterBetween, FilterContain, FilterGreaterEqual, FilterLowerEqual, FilterMatch};

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
        $this->output = DataController::OUTPUT_LIST;
        $this->registerLimitSort($limit);
        $this->filters[] = new FilterGreaterEqual(
            self::FIELD_TIME,
            $this->parseDateString($dateString)
        );
        return $this->get();
    }

    public function before(string $dateString, int $limit=0):array
    {
        $this->output = DataController::OUTPUT_LIST;
        $this->registerLimitSort($limit);
        $this->filters[] = new FilterLowerEqual(
            self::FIELD_TIME,
            $this->parseDateString($dateString)
        );
        return $this->get();
    }

    public function between(string $start, string $end, int $limit=0, string $sort='asc'):array
    {
        $this->output = DataController::OUTPUT_LIST;
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
        $this->output = DataController::OUTPUT_LIST;
        $this->registerLimitSort($limit, $sort);
        $this->filters[] = new FilterMatch(self::FIELD_USER, $id);
        return $this->get();
    }

    public function has(string $text, int $limit=0, string $sort='asc'):array
    {
        $this->output = DataController::OUTPUT_LIST;
        $this->registerLimitSort($limit, $sort);
        $this->filters[] = new FilterContain(self::FIELD_TEXT, $text);
        return $this->get();
    }

    public function list(int $limit=0, string $sort='asc'):array
    {
        $this->output = DataController::OUTPUT_LIST;
        $this->registerLimitSort($limit, $sort);
        return $this->get();
    }

    public function post():array
    {
        return [];
    }

    public function text(int $id):array
    {
        return $this->field($id, self::FIELD_TEXT);
    }

    public function user(int $id):array
    {
        $this->cacheCustom = true;
        $data = $this->cache->load();

        if(!$data) {
            $message = $this->id($id);
            $userid = $message[self::FIELD_USER] ?? 0;
            $data = app('App\Http\Controllers\UserController')->id($userid);
            $this->cache->register($data);
        }

        return $data;
    }

    public function userField(int $id, string $field):array
    {
        $this->cacheCustom = true;
        $data = $this->cache->load();

        if(!$data) {
            $user = $this->user($id);
            $data = [$field => $user[$field] ?? ''];
            $this->cache->register($data);
        }

        return $data;
    }
}
