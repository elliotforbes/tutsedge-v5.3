<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Markdown;

use Request;
use App\Course;
use App\Tag;
use Log;
use Carbon\Carbon;
use Auth;

class CourseController extends Controller
{
    
    public function store() 
    {   
        $input = Request::all();
        Log::info($input);
        $course = new Course();
        $course->title = $input['title'];
        $course->slug = $input['slug'];
        $course->body = $input['body'];
        $course->description = $input['description'];
        $course->author = 'Elliot Forbes';
        $course->isLive = '1';
        $course->save();
        return response(array(
              'error' => false
          ), 200);
    }

    public function update($slug, Request $request)
    { 
        $input = Request::all();
        Log::info($input);
        $course = Course::whereSlug($slug)->get()->first();
        $course->title = $input['title'];
        $course->slug = $input['slug'];
        $course->body = $input['body'];
        $course->description = $input['description'];
        $course->author = 'Elliot Forbes';

        $course->isLive = '1';
        $course->save();        
        return response(array(
              'error' => false
          ), 200);
    }

}