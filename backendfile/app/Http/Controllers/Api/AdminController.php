<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Transaction;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class AdminController extends Controller
{

    //Mengambil data statistik untuk dashboard overview
     
   public function getStatistics()
{
    try {
        $totalBuku = Book::count();
        $totalReport = Report::count();

        try {
            $totalTerjual = (int) Transaction::where('status', 'berhasil')->sum('jumlah');
        } catch (\Exception $e) {
            $totalTerjual = 0; 
        }

        $grafik = Transaction::select('id as label', 'total_harga as value')
            ->where('status', 'berhasil')
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success'          => true,
            'total_buku'       => $totalBuku,
            'total_terjual'    => $totalTerjual,
            'total_report'     => $totalReport,
            'grafik_penjualan' => $grafik
        ]);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}
}