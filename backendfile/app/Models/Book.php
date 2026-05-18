<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';

    public $timestamps = false;

    protected $fillable = ['judul', 'author', 'sinopsis', 'genre', 'harga', 'stock', 'gambar'];

}
