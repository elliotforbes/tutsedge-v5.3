<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Markdown;

use Request;
use App\Lesson;
use App\Tag;
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
        $article->description = $input['description'];
        $article->author = 'Elliot Forbes';
        $article->slug = $input['slug'];
        $article->image_path = $input['image'];
        $article->course_id = $input['course_id'];

        $tags = $input['tags'];

        $article->tags = $tags;
        Log::info($tags);

        $article->published_at = Carbon::now();
        $article->created_at = Carbon::now();
        $article->updated_at = Carbon::now();

        $article->save();

        Log::info("Store method hit");

        return response(array(
            'error' => false
        ), 200);
    }
    
    
    public function update($slug, Request $request)
    {
        Log::info("Lesson update function hit");

        $input = Request::all();
        $article = Lesson::whereSlug($slug)->get()->first();

        $article->title = $input['title'];
        $article->body = $input['body'];
        $article->description = $input['description'];
        $article->slug = $input['slug'];
        $article->image_path = $input['image_path'];
        $article->course_id = $input['course_id'];

        $article->updated_at = Carbon::now();

        $tags = $input['tags'];
        Log::info($tags);   
        $articles->tags()->detach();

        foreach ($tags as $tag) {
            Log::info($tag);
            $currTag = Tag::find($tag['id'])->get()->first();
            $article->tags()->save($currTag);
        }
        
        $article->save();

        return response(array(
            'error' => false
        ), 200);
    }
    
    
    
}
