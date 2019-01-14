<?php

namespace App\Data\Cache;

use App\Data\Filter\DataFilter;
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;

class CacheManager
{
    protected const FILTERS = [
        'FilterBetween',
        'FilterContain',
        'FilterContainInsensitive',
        'FilterGreater',
        'FilterGreaterEqual',
        'FilterLower',
        'FilterLowerEqual',
        'FilterMatch',
    ];

    protected $delay = 0;
    protected $filename = '';
    protected $request = false;
    protected $start = 0;

    public function __construct(int $delay, string $filename)
    {
        $this->delay = $delay;
        $this->filename = str_replace('{id}', '', $filename);
        $this->folder = PATH_CACHE . $this->filename . DIRECTORY_SEPARATOR;
        $this->request = app(Request::class);
        $this->start  = time();
    }

    public function load():array
    {
        return [];
    }

    public function register(array $data):void
    {
        /*
        echo '<pre>'.print_r([
            'asc'    => $this->asc,
            'delay'  => $this->delay,
            'filename' => $this->filename,
            'filters'  => $this->filters,
            'f-id' => $this->getFilterId( $this->filters[0] ),
            'limit' => $this->limit,
            'output' => $this->output,
            'sorts' => $this->sorts,
            'start' => $this->start,
        ], true).'</pre>';
        */
        //$filepath = $this->folder;
        
        //var_dump($this->request);
        $path = $this->getFilePath();
        //echo $path . "\n\n";
        
        $dir = dirname($path);
        if(!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }

        file_put_contents($path, json_encode($data));
    }

    protected function getFilePath():string
    {
        $queryFolder = str_replace('/', '-', $this->getQuery()) . DIRECTORY_SEPARATOR;
        return $this->folder . $queryFolder . $this->start . '.json';
    }

    private function getClassName(mixed $class):string
    {
        $name = get_class($class);
        return substr($name, strrpos($name, '\\') + 1);
    }

    private function getFilterId(DataFilter $datafilter):int
    {
        $name = $this->getClassName($datafilter);
        return array_search($name, self::FILTERS) + 1;
    }

    private function getQuery():string
    {
        return $this->request->path();
    }
}