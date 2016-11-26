<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Log;
use Auth;

use App\Course;

class CourseAPIController extends Controller
{
    /*
     * Returns stuff
     */
    public function index(Request $request)
    {
        Log::info("API Request made for Courses...");

        $courses = Course::paginate(10);
        return response(array(
            'error' => false,
            'courses' => $courses->toArray(),
        ), 200);
    } 

    public function show($slug) 
    {
        Log::info("API Request made for course with id: " . $slug);
        $course = Course::whereSlug($slug)->get()->first();

        return response(array(
            'error' => false,
            'course' => $course->toArray(),
        ), 200);
    }
}
