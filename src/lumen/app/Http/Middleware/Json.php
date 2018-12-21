<?php

namespace App\Http\Middleware;

use Closure;

class Json
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $headers = array(
            'Content-Type' => 'application/json; text/plain; charset=UTF-8',
        );
        foreach($headers as $key=>$val) {
            $response->header($key, $val);
        }
        return $response;
    }
}
