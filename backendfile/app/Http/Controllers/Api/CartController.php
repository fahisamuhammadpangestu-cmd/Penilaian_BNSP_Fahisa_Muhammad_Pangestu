<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request) {
        $cart = Cart::where('user_id', $request->user()->id)->with('book')->get();
        return response()->json($cart);
    }

    public function store(Request $request) {
        Cart::create([
            'user_id' => $request->user()->id,
            'book_id' => $request->book_id,
            'jumlah' => $request->jumlah ?? 1
        ]);
        return response()->json(['message' => 'Berhasil ditambah ke keranjang']);
    }

    public function destroy($id)
    {
    try {
        $cartItem = Cart::findOrFail($id);
        
        // hanya pemilik keranjang yang bisa menghapus
        if ($cartItem->user_id !== auth()->id()) {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Item berhasil dihapus']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
}