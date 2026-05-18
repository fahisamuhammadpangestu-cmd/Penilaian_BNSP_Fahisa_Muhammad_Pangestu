<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AdminController;

//Public Routes

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Must Login with Sanctum)

Route::middleware('auth:sanctum')->group(function () {

    // --- KHUSUS ADMIN ---
    Route::middleware('admin')->group(function () {
        Route::post('/books', [BookController::class, 'store']); 
        Route::put('/books/{id}', [BookController::class, 'update']); 
        Route::delete('/books/{id}', [BookController::class, 'destroy']); 
        Route::get('/admin/statistics', [AdminController::class, 'getStatistics']);
        Route::get('/reports', [ReportController::class, 'index']);
        Route::delete('/reports/{id}', [ReportController::class, 'destroy']);
        Route::get('/admin/transactions', [TransactionController::class, 'index']);
    Route::put('/transactions/{id}/status', [TransactionController::class, 'updateStatus']);
        
        // Admin Transaction Management
        Route::get('/admin/transactions', [TransactionController::class, 'index']);
        Route::put('/transactions/{id}/status', [TransactionController::class, 'updateStatus']);
        Route::put('/transactions/{id}/validate', [TransactionController::class, 'validateTransaction']);
    });

    // --- USER & ADMIN ---
    Route::get('/books', [BookController::class, 'index']); 
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/report', [ReportController::class, 'store']);
    Route::post('/books/{id}/reduce-stock', [BookController::class, 'reduceStock']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
    Route::get('/transactions/user', [TransactionController::class, 'userHistory']);

    // --- FITUR KERANJANG ---
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    // --- FITUR TRANSAKSI USER ---
    Route::post('/checkout', [TransactionController::class, 'store']);
    Route::get('/transactions/user', [TransactionController::class, 'userHistory']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});