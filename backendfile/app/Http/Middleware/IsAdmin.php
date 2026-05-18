<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // pengecekan apakah user yang login memiliki role 'admin'
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request); // Jika benar admin, silahkan lewat
        }

        // Jika bukan admin, tolak aksesnya
        return response()->json([
            'message' => 'Akses ditolak! Anda bukan admin.'
        ], 403);
    }
}