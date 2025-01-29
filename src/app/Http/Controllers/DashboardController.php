<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Expense;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $totalExpenses = (float) $user->expenses()->sum('amount');
        $monthlyExpenses = (float) $user->expenses()
            ->whereMonth('date', now()->month)
            ->sum('amount');
        
        $recentExpenses = $user->expenses()
            ->with('category', 'user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($expense) {
                $expense->amount = (float) $expense->amount;
                return $expense;
            });
            
        $categoryTotals = $user->expenses()
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->whereMonth('date', now()->month)
            ->groupBy('category_id')
            ->with('category')
            ->get()
            ->map(function ($category) {
                $category->total = (float) $category->total;
                return $category;
            });

        return Inertia::render('Dashboard', [
            'totalExpenses' => $totalExpenses,
            'monthlyExpenses' => $monthlyExpenses,
            'recentExpenses' => $recentExpenses,
            'categoryTotals' => $categoryTotals
        ]);
    }

    public function monthlyReport()
    {
        $user = auth()->user();
        
        $monthlyData = $user->expenses()
            ->select(
                DB::raw('YEAR(date) as year'),
                DB::raw('MONTH(date) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->take(12)
            ->get();

        return Inertia::render('Reports/Monthly', [
            'monthlyData' => $monthlyData
        ]);
    }

    public function categoryReport()
    {
        $user = auth()->user();
        
        $categoryData = $user->expenses()
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->whereMonth('date', now()->month)
            ->groupBy('category_id')
            ->with('category')
            ->get();

        return Inertia::render('Reports/Category', [
            'categoryData' => $categoryData
        ]);
    }

    public function trendsReport()
    {
        $user = auth()->user();
        
        $trends = $user->expenses()
            ->select(
                'category_id',
                DB::raw('YEAR(date) as year'),
                DB::raw('MONTH(date) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->groupBy('category_id', 'year', 'month')
            ->with('category')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get()
            ->groupBy('category_id');

        return Inertia::render('Reports/Trends', [
            'trends' => $trends
        ]);
    }
}
