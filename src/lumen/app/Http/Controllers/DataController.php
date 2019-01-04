<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class DataController extends BaseController
{
    protected $filepath = '';

    /**
     * Returns the data as List
     * @return array [Data as List]
     */
    public function get():array
    {
       $file = $this->getFile();
       return $file;
    }

    /**
     * Returns the JSON content
     * @return array [JSON content as assoc Array]
     */
    protected function getFile():array
    {
        $str = file_get_contents($this->filepath);
        $arr = json_decode($str, true);
        return $arr;
    }
}
