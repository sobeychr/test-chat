<?php

namespace App\Data\Cache;

use App\Data\Filter\DataFilter;
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;

class CacheManager
{
    protected $delay = 0;
    protected $request = false;
    protected $start = 0;

    public function __construct(int $delay)
    {
        $this->delay = $delay;
        $this->request = app(Request::class);
        $this->start = time();
    }

    public function load():array
    {
        $timelimit = $this->start - $this->delay;

        $queryFolder = str_replace('/', '-', $this->getQuery()) . DIRECTORY_SEPARATOR;
        $path = PATH_CACHE . $queryFolder;
        $filepath = '';

        if(file_exists($path)) {
            $di = new \DirectoryIterator($path);
            foreach($di as $file)
            {
                if($file->isDot() || !$file->isFile() || !$file->isReadable()) {
                    continue;
                }

                $filetime = str_replace('.json', '', $file->getFilename());
                if($timelimit < intval($filetime)) {
                    $filepath = $file->getPathname();
                }
                else {
                    @unlink($file->getPathname());
                }
            }
        }

        if(!$filepath) {
            return [];
        }

        echo 'loaded '.$filepath."\n\n";
        $data = file_get_contents($filepath);
        return json_decode($data, true);
    }

    public function register(array $data):void
    {
        $queryFolder = str_replace('/', '-', $this->getQuery()) . DIRECTORY_SEPARATOR;
        $path = PATH_CACHE . $queryFolder . $this->start . '.json';
        
        $dir = dirname($path);
        if(!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }

        echo 'registered '.$path."\n\n";
        file_put_contents($path, json_encode($data));
    }

    private function getClassName(mixed $class):string
    {
        $name = get_class($class);
        return substr($name, strrpos($name, '\\') + 1);
    }

    private function getQuery():string
    {
        return $this->request->path();
    }
}