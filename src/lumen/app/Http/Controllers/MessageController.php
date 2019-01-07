<?php

namespace App\Http\Controllers;

class MessageController extends DataController
{
    //protected $filepath = './../../data/message.json';
    protected $filepath = './../../data/message-init.json';

    // FROM PARENT CLASS
    // public function get():array
    // protected function getFile():array

    // Various search via API
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
