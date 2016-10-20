<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Markdown;

use Request;
use App\Lesson;
use Log;
use Carbon\Carbon;

class LessonController extends Controller
{
    
    public function index()
    {
        $lessons = Lesson::all();
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
        $article = new Lesson();

        $article->title = $input['title'];
        $article->body = $input['body'];
        $article->desc = $input['description'];
        $article->author = 'Elliot Forbes';
        $article->slug = $input['slug'];
        $article->image_path = $input['image'];
        $article->course_id = $input['course_id'];

        $article->published_at = Carbon::now();
        $article->created_at = Carbon::now();
        $article->updated_at = Carbon::now();

        $article->save();

        Log::info("Store method hit");


        return view('admin.article.edit', compact('article'));
    }
    
    public function show($slug)
    {
        $lesson = Lesson::whereSlug($slug)->get()->first();
        return view('admin.article.edit', compact('lesson'));
    }
    
    public function edit($slug)
    {
        $article = Lesson::whereSlug($slug)->get()->first();
        return view('admin.article.edit', compact('article'));
    }
    
    public function update($slug, Request $request)
    {
        Log::info("Lesson update function hit");

        $input = Request::all();
        $article = Lesson::whereSlug($slug)->get()->first();

        $article->title = $input['title'];
        $article->body = $input['body'];
        $article->author = $input['author'];
        $article->slug = $input['slug'];
        $article->image_path = $input['image_path'];
        $article->course_id = $input['course_id'];
        $article->updated_at = Carbon::now();

        $article->save();

        return view('admin.article.edit', compact('article'));
    }
    
    
    
}
