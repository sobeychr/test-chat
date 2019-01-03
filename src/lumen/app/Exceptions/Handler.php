<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        //return parent::render($request, $exception);
        
        $route = $request->route();
        $route = $route[1];

        $excFile = $this->cutFile( $exception->getFile() );

        $excTrace = [];
        $traceIndex = ['line', 'function', 'class', 'type'];
        $trace = $exception->getTrace();
        foreach($trace as $entry) {
            $arr = [];

            if(isset($entry['file'])) {
                $arr['file'] = $this->cutFile($entry['file']);
            }

            foreach($traceIndex as $index) {
                if(isset($entry[$index])) {
                    $arr[$index] = $entry[$index];
                }
            }

            $excTrace[] = $arr;
        }

        return response()->json([
            'status'  => 500,
            'summary' => $exception->getMessage() . ' in ' . $excFile . ' on line ' . $exception->getLine(),
            'request' => [
                'method' => $request->method(),
                'path'   => $request->path(),
                'route'  => $route,
            ],
            'exception' => [
                'message' => $exception->getMessage(),
                'file' => $excFile,
                'line' => $exception->getLine(),
                'trace' => $excTrace,
            ],
        ], 500);
    }

    protected function cutFile(string $filepath):string
    {
        $cut  = 'src\\lumen';
        $file = strstr($filepath, $cut, false);
        $file = substr($file, strlen($cut));
        return $file;
    }
}
