<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // pengiriman pesan oleh user
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'email' => 'required|email',
            'pesan' => 'required'
        ]);

        Report::create($request->all());

        return response()->json(['message' => 'Pesan Anda berhasil dikirim ke admin!']);
    }

    // Admin melihat semua pesan
    public function index()
    {
        return response()->json(Report::orderBy('created_at', 'desc')->get());
    }

    // Admin menghapus pesan yang sudah selesai ditangani pembayarannya
    public function destroy($id)
    {
        Report::find($id)->delete();
        return response()->json(['message' => 'Laporan berhasil dihapus']);
    }
}