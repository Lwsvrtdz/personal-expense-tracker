<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Auth::user()->expenses()
            ->with('category', 'user')
            ->latest()
            ->paginate(10);
            
        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses
        ]);
    }

    public function create()
    {
        $categories = Auth::user()->categories;
        
        return Inertia::render('Expenses/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
            'notes' => 'nullable|string'
        ]);

        $validated['user_id'] = Auth::id();
        
        Expense::create($validated);

        return redirect()->route('expenses.index')
            ->with('message', 'Expense created successfully');
    }

    public function edit(Expense $expense)
    {
        $categories = Auth::user()->categories;
        
        return Inertia::render('Expenses/Edit', [
            'expense' => $expense->load('category'),
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
            'notes' => 'nullable|string'
        ]);

        $expense->update($validated);

        return redirect()->route('expenses.index')
            ->with('message', 'Expense updated successfully');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        return redirect()->route('expenses.index')
            ->with('message', 'Expense deleted successfully');
    }
}
