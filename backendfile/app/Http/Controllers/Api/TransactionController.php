<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Book;
use Illuminate\Http\Request;
use Exception;

class TransactionController extends Controller
{
    // 1. Admin: List Semua Transaksi
    public function index()
    {
        try {
            $transactions = Transaction::with(['user', 'book'])
                            ->orderBy('id', 'desc')
                            ->get();
            return response()->json($transactions);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // 2. User: Buat Pesanan Baru (Mendukung Beli Langsung & Keranjang)
    public function store(Request $request)
    {
        try {
            // Cek apakah yang dikirim adalah 'items' (dari Keranjang) atau data tunggal (Beli Langsung)
            if ($request->has('items')) {
                $items = $request->items;
            } else {
                $items = [$request->all()];
            }

            $results = [];

            foreach ($items as $item) {
                if (!isset($item['book_id'])) {
                    continue;
                }

                $book = Book::findOrFail($item['book_id']);
                $qty = $item['jumlah'] ?? 1;

                // ---- DETEKSI NAMA KOLOM STOK SECARA OTOMATIS ----
                $bookArray = $book->toArray();
                if (array_key_exists('stok', $bookArray)) {
                    $namaKolom = 'stok';
                } elseif (array_key_exists('stock', $bookArray)) {
                    $namaKolom = 'stock';
                } else {
                    $namaKolom = 'stok'; // Fallback default
                }

                // Ambil nilai stok asli, jika NULL samakan dengan 0
                $currentStok = $book->$namaKolom ?? 0;

                // ---- VALIDASI STOK ----
                if ($currentStok < $qty) {
                    return response()->json([
                        'success' => false,
                        'message' => "Stok buku '" . $book->judul . "' tidak mencukupi! Sisa stok: " . $currentStok
                    ], 400);
                }

                // ---- SIMPAN TRANSAKSI ----
                $transaction = Transaction::create([
                    'user_id'     => auth()->id(),
                    'book_id'     => $item['book_id'],
                    'jumlah'      => $qty,
                    'total_harga' => $book->harga * $qty,
                    'status'      => 'proses',
                ]);

                // ---- POTONG STOK DI DATABASE ----
                $book->decrement($namaKolom, $qty);

                $results[] = $transaction;
            }

            return response()->json([
                'success' => true,
                'message' => 'Transaksi berhasil disimpan dan stok diperbarui',
                'data'    => $results
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan di server',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    // 3. Admin: Validasi (Terima/Tolak)
    public function updateStatus(Request $request, $id)
    {
        try {
            $transaction = Transaction::findOrFail($id);
            $transaction->update(['status' => $request->status]);

            return response()->json(['success' => true, 'message' => 'Status diperbarui']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // 4. Admin & User: Hapus Transaksi
    public function destroy($id)
    {
        try {
            $transaction = Transaction::findOrFail($id);
            $transaction->delete();
            return response()->json(['success' => true, 'message' => 'Berhasil dihapus']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // 5. User: Riwayat Milik Sendiri
    public function userHistory()
    {
        try {
            $data = Transaction::with('book')->where('user_id', auth()->id())->get();
            return response()->json($data);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}