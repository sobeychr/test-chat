<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class DataController extends BaseController
{
    protected const DATA_LIST   = 1;
    protected const DATA_RAW    = 2;
    protected const DATA_SINGLE = 3;

    protected $asc = true; // bool to sort ASCENDING or DESCENDING
    protected $ascFields  = []; // List of fields as String to sort upon
    protected $dataOutput = 1; // Expecting results
    protected $filename   = ''; // Filename to fetch data - use {id} for numerical incrementation
    protected $filters = []; // List of DataFilters when fetching data
    protected $limit   = 50; // Limit of entries to return

    /**
     * Loads JSON files and returns content as Array
     * @uses Data parsing functions - applyFilter() applyLimit() applySort()
     * @return array [JSON content as Array]
     */
    protected function get():array
    {
        $filepath = PATH_DATA . $this->filename . '.json';
        $id = 0;

        $filepath = str_replace('{id}', $id, $filepath);

        $data = $this->loadFile($filepath);
        $data = $this->applyFilter($data);

        if($this->dataOutput === self::DATA_SINGLE) {
            $data = array_values($data);
            return count($data) ? $data[0] : [];
        }

        $data = $this->applySort($data);
        $data = $this->applyLimit($data);

        return $this->dataOutput === self::DATA_RAW ? $data : array_values($data);
    }

    protected function registerLimitSort(int $limit, string $sort):void
    {
        $this->asc = $sort === 'desc' ? false : true;
        $this->limit = $limit;
    }

    private function applyFilter(array $data):array
    {
        if(count($this->filters) > 0) {
            foreach($this->filters as $filter) {
                $data = $filter->filter($data);
            }
        }
        return $data;
    }
    private function applyLimit(array $data):array
    {
        if(count($data) > $this->limit) {
            $data = array_slice($data, 0, $this->limit);
        }
        return $data;
    }
    private function applySort(array $data):array
    {
        if(count($this->ascFields) > 0) {
            usort($data, [$this, 'sortGet']);
        }
        return $data;
    }

    private function loadFile(string $filepath):array
    {
        if(file_exists($filepath)) {
            if($content = file_get_contents($filepath)) {
                if($json = json_decode($content, true)) {
                    return $json;
                }
            }
        }

        return [];
    }

    private function sortGet($a, $b):int
    {
        $afirst = $this->asc ? 1 : -1;
        $bfirst = $this->asc ? -1 : 1;

        foreach($this->ascFields as $field)
        {
            if(!isset( $a[$field] )) {
                return $bfirst;
            }
            elseif(!isset( $b[$field] )) {
                return $afirst;
            }

            $aval = $a[$field];
            $bval = $b[$field];

            if($aval === $bval) {
                continue;
            }
            elseif(is_numeric($aval) && !is_numeric($bval)) {
                return $afirst;
            }
            elseif(!is_numeric($aval) && is_numeric($bval)) {
                return $bfirst;
            }
            elseif(is_numeric($aval) && is_numeric($bval)) {
                return $aval >= $bval ? $afirst : $bfirst;
            }
            elseif(is_string($aval) && is_string($bval)) {
                return strcmp($aval, $bval) > 0 ? $afirst : $bfirst;
            }
        }

        return $afirst;
    }

    // Various searches for extended Controllers
    /**
     * Returns a filtered JSON content as List or the Single Entry
     * @param  array $search [Assoc Array for the search filter with field to value]
     * @param  bool  $single [TRUE to return only 1 entry]
     * @return array [the filtered content as List or the Single Entry]
     */
    /*
    protected function contain      (array $search, bool $single=false):array { return $this->filter(self::MATCH_CONTAIN,    $search, $single); }
    protected function find         (array $search, bool $single=false):array { return $this->filter(self::MATCH_EXACT,      $search, $single); }
    protected function greater      (array $search, bool $single=false):array { return $this->filter(self::MATCH_GREATER,    $search, $single); }
    protected function greaterEqual (array $search, bool $single=false):array { return $this->filter(self::MATCH_GREATER_EQ, $search, $single); }
    protected function lower        (array $search, bool $single=false):array { return $this->filter(self::MATCH_LOWER,      $search, $single); }
    protected function lowerEqual   (array $search, bool $single=false):array { return $this->filter(self::MATCH_LOWER_EQ,   $search, $single); }
    */

    /**
     * Returns a filtered JSON content as List or the Single Entry between 2 values
     * @param  string $field  [String value of the field to filter from]
     * @param  int    $min    [Minimum value for the entry]
     * @param  int    $max    [Maximum value for the entry]
     * @param  bool   $single [TRUE to return only 1 entry]
     * @return array  [the filtered content as List or the Single Entry]
     */
    /*
    protected function filterBetween(string $field, int $min, int $max, bool $single=false):array
    {
        $data = $this->get();
        
        $data = array_filter($data, function($entry) use ($field, $min, $max) {
            if(!isset($entry[$field])) {
                return false;
            }
            return $min <= $entry[$field] && $entry[$field] <= $max;
        });

        $values = array_values($data);
        return ($single && count($values)===1) ? $values[0] : $values;
    }
    */

    /**
     * Reusable filter function for searches
     * @param  int   $match  [MATH_* contants from DataController]
     * @param  array $search [Assoc Array from various protected filter functions]
     * @param  bool  $single [Bool from various protected filter functions]
     * @return array [the filtered content as List or the Single Entry]
     */
    /*
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
    */

    /**
     * Returns a query date string into a timestamp
     * @param  string $dateString [DateString in format YYYY-MM-DD-HH-II-SS]
     * @return int    [Timestamp from DateString]
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
     * @param  int     $value [Date numerical value - year, month, date, hour, minute, second]
     * @param  int     $decimals [Amount of leading zeros to have]
     * @return string  [Parsed date numerical value]
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
