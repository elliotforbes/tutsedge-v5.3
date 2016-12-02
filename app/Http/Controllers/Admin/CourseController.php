<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Markdown;

use Request;
use App\Course;
use App\Tag;
use Log;
use Carbon\Carbon;

class CourseController extends Controller
{
    
    public function store() 
    {   
        $input = Request::all();
        Log::info($input);
        $course = new Course();
        if(Auth::check())
        {   
            if(Auth::user()->github_id == 3332224){
                $course->title = $input['title'];
                $course->slug = $input['slug'];
                $course->body = $input['body'];
                $course->description = $input['description'];
                $course->author = 'Elliot Forbes';
                $course->isLive = '1';
                $course->save();
            }
        }
        return response(array(
              'error' => false
          ), 200);
    }

    public function update()
    { 
        $input = Request::all();
        Log::info($input);
        $course = Course::whereSlug($slug)->get()->first();
        if(Auth::check())
        {   
            if(Auth::user()->github_id == 3332224){
                $course->title = $input['title'];
                $course->slug = $input['slug'];
                $course->body = $input['body'];
                $course->description = $input['description'];
                $course->author = 'Elliot Forbes';

                $course->isLive = '1';
                $course->save();        
            }
        }
        return response(array(
              'error' => false
          ), 200);
    }

}