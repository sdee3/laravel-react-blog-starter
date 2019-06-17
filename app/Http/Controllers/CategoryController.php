<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function fetch(int $id = null)
    {
        if ($id) {
            return Category::find($id);
        } else {
            return Category::all();
        }
    }

    public function store(Request $request)
    {
        $category = new Category;
        $category->name = $request->newCategory['name'];
        $category->save();

        return $category;
    }

    public function update(Request $request)
    {
        $newValues = $request->all();
        $categories = Category::all();

        foreach ($categories as $key => $cat) {
            $cat->name = $newValues[$key];
            $cat->save();
        }

        return response()->json('Category updated successfully!', 200);
    }

    public function delete($name)
    {
        $category = Category::where('name', $name)->first();
        $category->delete();

        return $category;
    }
}
