<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Log;
use Auth;

use App\Lesson;

class LessonAPIController extends Controller
{
    /*
     * Returns stuff
     */
    public function index(Request $request)
    {
        Log::info("API Request made for Lessons...");

        $lessons = Lesson::orderBy('published_at', 'DESC')->paginate(10);
        return response(array(
            'error' => false,
            'lessons' => $lessons->toArray(),
        ), 200);
    } 

    public function show($slug) 
    {
        Log::info("API Request made for lesson with slug: " . $slug);
        $lesson = Lesson::whereSlug($slug)->get()->first();

        return response(array(
            'error' => false,
            'lesson' => $lesson->toArray(),
        ), 200);
    }
}
