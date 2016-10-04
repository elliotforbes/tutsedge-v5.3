<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Review;

class BookController extends Controller
{
    public function index()
    {
        $books = Review::all();
        return view('frontend.books.index', compact('books'));
    }
    
    public function single($slug)
    {
        $book = Review::whereSlug($slug)->get()->first();
        return view('frontend.books.single', compact('book'));
    }
}
