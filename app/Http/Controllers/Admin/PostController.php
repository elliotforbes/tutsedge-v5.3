<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Markdown;

use Request;
use App\Post;
use App\Tag;
use Log;
use Carbon\Carbon;
use Auth;

class PostController extends Controller
{
    
    public function index()
    {
        $lessons = Post::all();
        return view('admin.article.all', compact('lessons'));
    }
    
    public function create()
    {
        Log::info("Create Method Hit");
        return view('admin.article.new');
    }

    public function store()
    {
        $input = Request::all();
        Log::info($input);
        $article = new Post();
        if(Auth::check())
        {   
            if(Auth::user()->github_id == 3332224){
                $article->title = $input['title'];
                $article->body = $input['body'];
                $article->description = $input['description'];
                $article->author = 'Elliot Forbes';
                $article->slug = $input['slug'];
                $article->isLive = '1';
                $article->published_at = Carbon::now();
                $article->created_at = Carbon::now();
                $article->updated_at = Carbon::now();

                $article->save();
            }
        }
        Log::info("Store method hit");

        return response(array(
            'error' => false
        ), 200);
    }
    
    
    public function update($id, Request $request)
    {
        Log::info("Lesson update function hit");

        $input = Request::all();
        $article = Post::find($id);

        if(Auth::check())
        {   
            if(Auth::user()->github_id == 3332224){
                $article->title = $input['title'];
                $article->body = $input['body'];
                $article->description = $input['description'];
                $article->isLive = '1';
                $article->slug = $input['slug'];
                $article->updated_at = Carbon::now();
                $article->save();
            }
        }
        return response(array(
            'error' => false
        ), 200);
    }
    
    
    
}
