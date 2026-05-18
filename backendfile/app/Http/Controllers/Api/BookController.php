<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    // 1. Menampilkan semua buku
    public function index()
    {
        $books = Book::all();
        return response()->json([
            'success' => true,
            'data'    => $books
        ]);
    }

    // 2. Menambah buku baru
    public function store(Request $request)
{
    // 1. Validasi Input
    $validator = Validator::make($request->all(), [
        'judul'    => 'required|string|max:255',
        'author'   => 'required|string|max:255',
        'harga'    => 'required|numeric|min:0',
        'stock'    => 'required|integer|min:0',
        'genre'    => 'required|string',
        'sinopsis' => 'nullable|string',
        'image'    => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors'  => $validator->errors()
        ], 422);
    }

    try {
        $imagePath = null;
        if ($request->hasFile('image')) {
            // menyimpan ke folder 'public/books'
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $imagePath = $file->storeAs('books', $fileName, 'public');
        }

        // 3. Simpan ke Database
        $book = Book::create([
            'judul'    => $request->judul,
            'author'   => $request->author,
            'sinopsis' => $request->sinopsis,
            'genre'    => $request->genre,
            'harga'    => $request->harga,
            'stock'    => $request->stock,
            'image'    => $imagePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil ditambahkan!',
            'data'    => $book
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menambahkan buku: ' . $e->getMessage()
        ], 500);
    }
    }

    // 3. Update Data Buku
    public function update(Request $request, $id)
    {
    $book = Book::findOrFail($id);

    $request->validate([
        'judul'  => 'required|string',
        'author' => 'required|string',
        'harga'  => 'required|numeric',
        'stock'  => 'required|integer',
    ]);

    //Ganti Gambar
    if ($request->hasFile('image')) {
        if ($book->image) {
            Storage::disk('public')->delete($book->image);
        }
        $book->image = $request->file('image')->store('books', 'public');
    }

    $book->update([
        'judul'  => $request->judul,
        'author' => $request->author,
        'harga'  => $request->harga,
        'stock'  => $request->stock,
        'genre'  => $request->genre,
        'sinopsis' => $request->sinopsis,
    ]);

    return response()->json(['success' => true, 'data' => $book]);
}

    // 4. Hapus Buku
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Buku tidak ditemukan'], 404);
        }

        $book->delete();

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil dihapus!'
        ]);
    }

    //reduce stock
    public function reduceStock(Request $request, $id) {
        $book = Book::findOrFail($id);
            if ($book->stock < $request->amount) {
                return response()->json(['message' => 'Stok tidak mencukupi'], 400);
            }
        $book->decrement('stock', $request->amount);
        return response()->json(['message' => 'Stok berhasil dikurangi']);
    }
}