<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Markdown;

use Request;
use App\Lesson;
use App\Tag;
use Log;
use Carbon\Carbon;
use Auth;

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
        if(Auth::check())
        {   
            if(Auth::user()->github_id == 3332224){
                $article = new Lesson();
                $article->title = $input['title'];
                $article->body = $input['body'];
                $article->description = $input['description'];
                $article->author = 'Elliot Forbes';
                $article->slug = $input['slug'];
                $article->image_path = $input['image'];

                $article->course_id = $input['course_id'];


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
    
    
    public function update($slug, Request $request)
    {
        Log::info("Lesson update function hit");

        $input = Request::all();
        $article = Lesson::whereSlug($slug)->get()->first();

        if(Auth::check())
        {   
            if(Auth::user()->github_id == 3332224){
                $article->title = $input['title'];
                $article->body = $input['body'];
                $article->description = $input['description'];
                $article->slug = $input['slug'];
                $article->image_path = $input['image_path'];
                $article->course_id = $input['course_id'];


                $article->updated_at = Carbon::now();

                $tags = $input['tags'];
                Log::info($tags);   
                $article->tags()->detach();

                foreach ($tags as $tag) {
                    Log::info($tag);
                    $currTag = Tag::find($tag['id']);
                    $article->tags()->save($currTag);
                }
                
                $article->save();
            }
        }
        return response(array(
            'error' => false
        ), 200);
    }
    
    
    
}
