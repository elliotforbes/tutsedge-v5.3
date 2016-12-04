<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Log;
use Auth;

use App\Post;
use App\Transformers\LessonTransformer;

class PostAPIController extends Controller
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
        Log::info("API Request made for Posts...");

        $posts = Post::orderBy('published_at', 'DESC')->paginate(10);

        Log::info($request);

        return response(array(
            'error' => false,
            'posts' => $posts->toArray(),
        ), 200);
    } 


    /*
     * Returns transformed list of all lessons
     */
    public function all() 
    {
        Log::info("API Request made for search");

        $posts = Post::all();

        return response()->json([
            'error' => false,
            'posts' => $this->lessonTransformer->transformCollection($posts->all())
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
            Post::where('title', 'like', '%' . $request->title . '%')
                    ->paginate(10);

        return response()->json([
            'error' => false,
            'posts' => $foundLessons->toArray(),
        ], 200);

    }

    /* 
     * Returns one lesson based on slug
     */
    public function show($id) 
    {
        Log::info("API Request made for post with slug: " . $id);
        $post = Post::find($id);

        return response(array(
            'error' => false,
            'post' => $post->toArray(),
        ), 200);
    }
}
