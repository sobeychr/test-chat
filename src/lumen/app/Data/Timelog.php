<?php

namespace App\Data;

class Timelog
{
    protected $logs  = [];
    protected $loop  = [];
    protected $end   = 0;
    protected $start = 0;

    public function __construct()
    {
        $this->start = $this->uTime();
    }

    public function endLoop():void
    {

    }

    public function getLogs():string
    {

    }

    public function newLoop():void
    {

    }

    public function tick(string $label, string $value=''):void
    {

    }
    
    private function lastTime():float
    {
        /*
        $t = $this->timelogs;
        $u = $this->uTime();
        $this->timelogs = $u;

        $c = $t === 0 ? $u : round($u - $t, 5);
        return $c < 0.0001 ? 0 : $c;
        */
    }
    private function uTime():float
    {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec + (float)$sec);
    }
}