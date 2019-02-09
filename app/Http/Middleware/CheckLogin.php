<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class CheckLogin
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
        $uid = session('uid');
        $request['user'] = User::find($uid);
        if (!$request['user']) {
            abort(401);
        }

        return $next($request);
    }
}
