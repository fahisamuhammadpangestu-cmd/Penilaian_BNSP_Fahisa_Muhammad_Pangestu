<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public $timestamps = true; 

    protected $fillable = [
        'user_id', 
        'book_id', 
        'jumlah', 
        'total_harga', 
        'status'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function book() {
        return $this->belongsTo(Book::class);
    }
}