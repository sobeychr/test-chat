<?php

namespace App\Http\Controllers;

use App\Datafilters\FilterMatch;
use Laravel\Lumen\Routing\Controller as BaseController;

class DataController extends BaseController
{
    // If the data output should be a List, Raw JSON or a Single JSON entry
    protected const DATA_LIST   = 1;
    protected const DATA_RAW    = 2;
    protected const DATA_SINGLE = 3;

    protected $asc = true;      // bool to sort ASCENDING or DESCENDING
    //protected $cacheDelay = 30; // 30 sec
    protected $cacheDelay = 60 * 60; // 1 hour
    protected $cacheTime  = 0;  // Cache started loading
    protected $data = self::DATA_RAW; // Expecting results as Raw JSON be default
    protected $filename = ''; // Filename to fetch data - use {id} for numerical incrementation
    protected $filters = [];  // List of DataFilters when fetching data
    protected $limit = 50; // Limit of entries to return
    protected $sorts = []; // List of fields as String to sort upon

    /**
     * Returns a single entry via ID
     * @param  int $id [ID to search for]
     * @return array   [The JSON content of the entry]
     */
    public function id(int $id):array
    {
        $this->data = DataController::DATA_SINGLE;
        $this->filters[] = new FilterMatch('id', $id);
        return $this->get();
    }

    /**
     * Returns the field value from a single entry via ID
     * @uses $this->id() [Fetches the entry]
     * @param  int    $id    [ID to search for]
     * @param  string $field [Field of the entry to return]
     * @return array         [Assoc Array of the Field with its Value]
     */
    public function field(int $id, string $field):array
    {
        $data = $this->id($id);
        return [$field => $data[$field] ?? ''];
    }

    /**
     * Loads JSON files and returns content as Array
     * @uses $this->data
     * @uses $this->applyFilter()
     * @return array [JSON content as Array]
     */
    protected function get():array
    {
        $this->cacheTime = time();

        if($this->limit === 1) {
            $this->data = self::DATA_SINGLE;
        }
        if($this->data === self::DATA_SINGLE) {
            $this->limit === 1;
        }

        if(! ($data = $this->loadCache()) ) {
            $data = $this->loadAllFiles();
            //$this->registerCache($data);
        }

        return $this->data === self::DATA_RAW
            ? $data
            : array_values($data);
    }

    /**
     * Registers the Limit and Sorting ASC or DESC for $this->get().
     * Must be called before $this->get().
     * @param  int $limit   [Limit of entries to return]
     * @param  string $sort ['asc' or 'desc']
     */
    protected function registerLimitSort(int $limit=0, string $sort='asc'):void
    {
        $this->asc = $sort === 'desc' ? false : true;
        if($limit) {
            $this->limit = $limit;
        }
    }

    private function getLatestCacheFile():string
    {
        $dirName = str_replace('{id}', '', $this->filename);
        $dirPath = PATH_CACHE . $dirName . DIRECTORY_SEPARATOR;

        if(!file_exists($dirPath)) {
            mkdir($dirPath);
        }

        $timelimit = $this->cacheTime - $this->cacheDelay;

        $files = array();
        $di = new DirectoryIterator();
        foreach($di as $file)
        {
            if($file->isDot() || !$file->isFile() || !$file->isReadable()) {
                continue;
            }
        }

        return $dirPath . $this->cacheTime . '.json';
    }
    private function loadCache():array
    {

        return [];
    }
    private function registerCache(array $data):void
    {
        $cacheFile = $this->getLatestCacheFile();
        file_put_contents($cacheFile, json_encode($data));
    }

    // Multiple functions processing the Data from $this->get()
    private function applyFilter(array $data):array
    {
        if(count($data) > 2 && count($this->filters) > 0) {
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
        if(count($data) > 2 && count($this->sorts) > 0) {
            usort($data, [$this, 'sortGet']);
        }
        return $data;
    }
    
    private $timelogs = 0;
    private function lastTime():float
    {
        $t = $this->timelogs;
        $u = $this->uTime();
        $this->timelogs = $u;

        $c = $t === 0 ? $u : round($u - $t, 5);
        return $c < 0.0001 ? 0 : $c;
    }
    private function uTime():float
    {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec + (float)$sec);
    }

    // Loads a files from $this->get()
    private function loadAllFiles():array
    {
        $logs = [
            'start' => $this->lastTime(),
            'it' => [],
        ];

        $fileroot = PATH_DATA . $this->filename . '.json';
        $id = 0;
        $filepath = str_replace('{id}', $id, $fileroot);

        $data = [];
        while( file_exists($filepath) ) {

            $filedata = $this->loadFile($filepath);
            $l = [
                'filepath' => $filepath,
                'data-raw' => count($data),
                'filedata-raw' => count($filedata),
                't-0' => $this->lastTime(),
            ];

            $filedata = $this->applyFilter($filedata);
            $l['filedata-filter'] = count($filedata);
            $l['t-1'] = $this->lastTime();

            if($this->data === self::DATA_SINGLE && count($filedata)) {
                return array_values($filedata)[0];
            }

            $data = array_merge($data, $filedata);
            $l['data-merge'] = count($data);
            $l['t-2'] = $this->lastTime();

            $data = $this->applySort($data);
            $l['data-sort'] = count($data);
            $l['t-3'] = $this->lastTime();

            $data = $this->applyLimit($data);
            $l['data-limit'] = count($data);
            $l['t-4'] = $this->lastTime();

            $logs['it'][] = $l;

            $filepath = str_replace('{id}', ++$id, $fileroot);
        }

        $logs['end'] = $this->uTime() - $logs['start'];
        echo '<pre>' . print_r($logs, true) . '</pre>';

        //return [];
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

    // Sorts entries within $this->get()
    private function sortGet($a, $b):int
    {
        $afirst = $this->asc ? 1 : -1;
        $bfirst = $this->asc ? -1 : 1;

        foreach($this->sorts as $field)
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

    /**
     * Returns a query date string into a timestamp
     * @param  string $dateString [DateString in format YYYY-MM-DD-HH-II-SS]
     * @return int                [Timestamp from DateString]
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
     * @param  int     $value    [Date numerical value - year or month or date or hour or minute or second]
     * @param  int     $decimals [Amount of leading zeros to have]
     * @return string            [Parsed date numerical value]
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
