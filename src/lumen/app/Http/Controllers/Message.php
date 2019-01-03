<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Message extends BaseController
{
    //const FILEPATH = './../../data/message.json';
    const FILEPATH = './../../data/message-init.json';

    /**
     * Returns the messages as JSON string
     * @return string [Messages as JSON string]
     */
    public function get():string
    {
       $file = $this->getFile();
       return json_encode($file);
    }

    /**
     * Enters a new message entry and returns the list as JSON string
     * @param int $userid [UserID submitting the new message]
     * @param string $text [Entry of the message]
     * @return string [Messages as JSON string]
     */
    public function post(\Illuminate\Http\Request $request):string
    {
        $data = $request->all();

        $file = $this->getFile();
        $file[] = [
            'userid' => $data['userid'] ?? 0,
            'text'   => $data['text'] ?? '',
            'time'   => time(),
        ];

        return json_encode($file);
    }

    /**
     * Returns the JSON content
     * @return array [JSON content as assoc Array]
     */
    protected function getFile():array
    {
        $arr = [];
        $str = file_get_contents(self::FILEPATH);
        try {
            $arr = json_decode($str, true);
        }
        catch(Exception $e) {}
        return $arr;
    }
}
