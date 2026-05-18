<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    protected $fillable = ['user_id', 'book_id', 'jumlah'];
    public $timestamps = false;

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id', 'id');
    }
}
