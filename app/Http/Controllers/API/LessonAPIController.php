<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Log;
use Auth;

use App\Lesson;
use App\Transformers\LessonTransformer;

class LessonAPIController extends Controller
{   
    protected $lessonTransformer;

    function __construct(LessonTransformer $lessonTransformer)
    {
        $this->lessonTransformer = $lessonTransformer;   
    }

    /*
     * Returns stuff
     */
    public function index(Request $request)
    {
        Log::info("API Request made for Lessons...");

        $lessons = Lesson::orderBy('published_at', 'DESC')->paginate(10);

        Log::info($request);

        return response(array(
            'error' => false,
            'lessons' => $lessons->toArray(),
        ), 200);
    } 


    /*
     * Returns transformed list of all lessons
     */
    public function all() 
    {
        Log::info("API Request made for search");

        $lessons = Lesson::all();

        return response()->json([
            'error' => false,
            'lessons' => $this->lessonTransformer->transformCollection($lessons->all())
        ], 200);
    }

    /*
     * Returns a set of paginated articles based on search query
     */
    public function search(Request $request)
    {
        Log::info("Search API request hit");

        Log::info($request);

        $foundLessons = 
            Lesson::where('title', 'like', '%' . $request->title . '%')
                    ->Where('author', 'like', '%' . $request->author . '%')
                    ->paginate(10);

        return response()->json([
            'error' => false,
            'lessons' => $foundLessons->toArray(),
        ], 200);

    }

    /* 
     * Returns one lesson based on slug
     */
    public function show($slug) 
    {
        Log::info("API Request made for lesson with slug: " . $slug);
        $lesson = Lesson::whereSlug($slug)->get()->first();

        $lesson->tags = $lesson->tags;

        return response(array(
            'error' => false,
            'lesson' => $lesson->toArray(),
        ), 200);
    }
}
