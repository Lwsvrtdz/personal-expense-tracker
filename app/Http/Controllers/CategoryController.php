<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Auth::user()->categories()
            ->withCount('expenses')
            ->withSum('expenses', 'amount')
            ->get();
            
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7'
        ]);

        $validated['user_id'] = Auth::id();
        
        Category::create($validated);

        return redirect()->route('categories.index')
            ->with('message', 'Category created successfully');
    }

    public function edit(Category $category)
    {
        $this->authorize('update', $category);
        
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7'
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')
            ->with('message', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);
        
        if ($category->expenses()->exists()) {
            return back()->with('error', 'Cannot delete category with associated expenses');
        }
        
        $category->delete();

        return redirect()->route('categories.index')
            ->with('message', 'Category deleted successfully');
    }
}
