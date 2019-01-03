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
    public function post(int $userid, string $text):string
    {
        $file = $this->getFile();
        $file[] = [
            'userid' => $userid,
            'text'   => $text,
            'time'   => time(),
        ];
        return json_encode($file);
    }


    public function test():string
    {
        $t++;
        return '{"test":"testing"}';
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
