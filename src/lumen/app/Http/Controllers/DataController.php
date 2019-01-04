<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class DataController extends BaseController
{
    private const MATCH_CONTAIN    = 1;
    private const MATCH_EXACT      = 2;
    private const MATCH_GREATER    = 3;
    private const MATCH_GREATER_EQ = 4;
    private const MATCH_LOWER      = 5;
    private const MATCH_LOWER_EQ   = 6;

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
     * Returns the JSON content as Assoc Array
     * @return array [JSON content as Assoc Array]
     */
    protected function getFile():array
    {
        $str = file_get_contents($this->filepath);
        $arr = json_decode($str, true);
        return $arr;
    }

    // Various searches for extended Controllers
    /**
     * Returns a filtered JSON content as List or the Single Entry
     * @param  array $search [Assoc Array for the search filter with field to value]
     * @param  bool $single [TRUE to return only 1 entry]
     * @return array [the filtered content as List or the Single Entry]
     */
    protected function contain      (array $search, bool $single=false):array { return $this->filter(self::MATCH_CONTAIN,    $search, $single); }
    protected function find         (array $search, bool $single=false):array { return $this->filter(self::MATCH_EXACT,      $search, $single); }
    protected function greater      (array $search, bool $single=false):array { return $this->filter(self::MATCH_GREATER,    $search, $single); }
    protected function greaterEqual (array $search, bool $single=false):array { return $this->filter(self::MATCH_GREATER_EQ, $search, $single); }
    protected function lower        (array $search, bool $single=false):array { return $this->filter(self::MATCH_LOWER,      $search, $single); }
    protected function lowerEqual   (array $search, bool $single=false):array { return $this->filter(self::MATCH_LOWER_EQ,   $search, $single); }

    /**
     * Reusable filter function for searches
     * @param  int    $match  [MATH_* contants from DataController]
     * @param  array  $search [Assoc Array from various protected filter functions]
     * @param  bool   $single [Bool from various protected filter functions]
     * @return array [the filtered content as List or the Single Entry]
     */
    private function filter(int $match, array $search, bool $single):array
    {
        $data = $this->get();
        
        $data = array_filter($data, function($entry) use ($search, $match) {
            foreach($search as $key=>$value) {

                if(!isset($entry[$key])) {
                    return false;
                }

                if($match === self::MATCH_CONTAIN) {
                    return stripos($entry[$key], $value) !== false;
                }
                elseif($match === self::MATCH_EXACT) {
                    return $entry[$key] === $value;
                }
                elseif($match === self::MATCH_GREATER) {
                    return $entry[$key] > $value;
                }
                elseif($match === self::MATCH_GREATER_EQ) {
                    return $entry[$key] >= $value;
                }
                elseif($match === self::MATCH_LOWER) {
                    return $entry[$key] < $value;
                }
                elseif($match === self::MATCH_LOWER_EQ) {
                    return $entry[$key] <= $value;
                }
            }

            return false;
        });
        
        $values = array_values($data);
        return ($single && count($values)===1) ? $values[0] : $values;
    }

    /**
     * Returns a query date string into a timestamp
     * @param  string $dateString [DateString in format YYYY-MM-DD-HH-II-SS]
     * @return int [Timestamp from DateString]
     */
    protected function parseDateString(string $dateString):int
    {
        $nums = explode('-', $dateString);
        $format = [
            $this->parseDateNumber($nums[0] ?? 0, 4),
            $this->parseDateNumber($nums[1] ?? 1),
            $this->parseDateNumber($nums[2] ?? 1),
            $this->parseDateNumber($nums[3] ?? 0),
            $this->parseDateNumber($nums[4] ?? 0),
            $this->parseDateNumber($nums[5] ?? 0),
        ];

        $date = \DateTime::createFromFormat('Y-m-d-H-i-s', implode('-', $format));
        return $date->getTimestamp();
    }

    /**
     * Parses a single date numerical value with leading zeros as String
     * @param  int $value [Date numerical value - year, month, date, hour, minute, second]
     * @param  int $decimals [Amount of leading zeros to have]
     * @return string [Parsed date numerical value]
     */
    private function parseDateNumber(int $value, int $decimals=2):string
    {
        $str = strval($value);
        while(strlen($str) < $decimals) {
            $str = '0' . $str;
        }
        return $str;
    }
}
