<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('expenses', ExpenseController::class);
    Route::resource('categories', CategoryController::class);
    
    // Report routes
    Route::get('/reports/monthly', [DashboardController::class, 'monthlyReport'])->name('reports.monthly');
    Route::get('/reports/category', [DashboardController::class, 'categoryReport'])->name('reports.category');
    Route::get('/reports/trends', [DashboardController::class, 'trendsReport'])->name('reports.trends');
});
