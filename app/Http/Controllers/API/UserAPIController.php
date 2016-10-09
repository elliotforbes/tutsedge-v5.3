<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Log;
use Auth;

use App\User;

class UserAPIController extends Controller
{
    /*
     * Returns stuff
     */
    public function index(Request $request)
    {
        Log::info("API Request made for Users...");

        $users = User::orderBy('created_at', 'DESC')->paginate(10);
        return response(array(
            'error' => false,
            'users' => $users->toArray(),
        ), 200);
    } 

    /*
     *
     */
    public function show($id) 
    {
        Log::info("API Request made for user with id: " . $id);
        $user = User::find($id);

        return response(array(
            'error' => false,
            'user' => $user->toArray(),
        ), 200);
    }
}
