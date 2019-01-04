<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DataController as DataController;

class MessageController extends DataController
{
    //protected $filepath = './../../data/message.json';
    protected $filepath = './../../data/message-init.json';

    // FROM PARENT CLASS
    // public function get():array
    // protected function getFile():array

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
