<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class CacheController extends BaseController
{
    public function clear():array
    {
        $error   = [];
        $success = [];

        $di = new \DirectoryIterator(PATH_CACHE);
        foreach($di as $file)
        {
            if($file->isDot() || !$file->isReadable()) {
                continue;
            }

            if($file->isDir()) {
                $subdir = $file->getPathname();

                $this->emptyDirectory($subdir);
                $result = @rmdir($subdir);
                if($result) {
                    $success[] = $subdir;
                }
                else {
                    $error[] = $subdir;
                }
            }
        }

        return [
            'error'   => $error,
            'success' => $success,
        ];
    }

    public function list():array
    {
        $return = [];

        $di = new \DirectoryIterator(PATH_CACHE);
        foreach($di as $file)
        {
            if($file->isDot() || !$file->isReadable()) {
                continue;
            }

            if($file->isDir()) {
                $subdir = $file->getPathname();

                $return[] = [
                    'request' => $this->getFileName($subdir, true),
                    'files' => $this->getFiles($subdir)
                ];
            }

        }

        return $return;
    }

    private function emptyDirectory(string $dirpath):array
    {
        $error   = [];
        $success = [];

        $di = new \DirectoryIterator($dirpath);
        foreach($di as $file)
        {
            if($file->isDot() || !$file->isReadable()) {
                continue;
            }

            $path = $file->getPathname();
            if($file->isDir()) {
                $this->emptyDirectory( $path );
            }
            elseif($file->isFile()) {
                $result = @unlink($path);

                if($result) {
                    $success[] = $dirpath;
                }
                else {
                    $error[] = $dirpath;
                }
            }
        }

        return [
            'error'   => $error,
            'success' => $success,
        ];
    }

    private function getFiles(string $subdir):array
    {
        $return = [];

        $di = new \DirectoryIterator($subdir);
        foreach($di as $file)
        {
            if($file->isFile()) {
                $filename = $this->getFileName($file->getPathname());
                $return[] = $filename;
            }
        }

        return $return;
    }

    private function getFileName(string $filepath, bool $isDir=false):string
    {
        $name = substr($filepath, strrpos($filepath, DIRECTORY_SEPARATOR) + 1);
        if($isDir) {
            $name = str_replace('-', '/', $name);
        }
        return $name;
    }
}
