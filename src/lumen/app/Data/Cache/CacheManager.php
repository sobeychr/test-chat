<?php

namespace App\Data\Cache;

use Illuminate\Http\Request;

class CacheManager
{
    public $controller = '';
    public $query = '';
    public $sort = 'asc';

    protected $delay = 0;
    protected $request = false;
    protected $time = 0;

    public function __construct(int $delay)
    {
        $this->delay = $delay;
        $this->request = app(Request::class);
        $this->time = time();

        $queryPath = $this->request->path();
        $paths = explode('/', $queryPath, 3);

        $this->controller = $paths[0];
        $this->query = $paths[1];
    }

    public function load():array
    {
        $filepath = $this->getLatestFile();
        if(!$filepath) {
            return [];
        }

        $data = file_get_contents($filepath);
        return json_decode($data, true);
    }

    public function register(array $data):void
    {
        $filepath = $this->getLatestFile();

        if(!$filepath) {
            $dir = $this->getDirectory();
            if(!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }

            $filepath = $dir . $this->time . '.json';
        }

        file_put_contents($filepath, json_encode($data));
    }

    private function getDirectory():string
    {
        $split = DIRECTORY_SEPARATOR;
        $dir = implode($split, [
            $this->controller,
            $this->query,
            $this->sort,
        ]);
        return PATH_CACHE . $dir . $split;
    }

    private function getLatestFile():string
    {
        $dir = $this->getDirectory();
        if(!file_exists($dir)) {
            return '';
        }

        $filepath = '';
        $timelimit = $this->time - $this->delay;

        $di = new \DirectoryIterator($dir);
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

        return $filepath;
    }
}