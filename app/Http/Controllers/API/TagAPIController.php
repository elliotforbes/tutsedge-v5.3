<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Log;
use Auth;

use App\Tag;

class TagAPIController extends Controller
{
    /*
     * Returns stuff
     */
    public function index(Request $request)
    {
        Log::info("API Request made for Tags...");

        $tags = Tag::paginate(10);
        return response(array(
            'error' => false,
            'tags' => $tags->toArray(),
        ), 200);
    } 

    public function show($id) 
    {
        Log::info("API Request made for tag with id: " . $id);
        $tag = Tag::find($id)->first();

        return response(array(
            'error' => false,
            'tag' => $tag->toArray(),
        ), 200);
    }
}
