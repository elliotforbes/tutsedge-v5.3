<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Log;
use Auth;
use Carbon\Carbon;

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

    /*
     * count's user growth stats for last month
     */
    public function growthStats()
    {
        Log::info("User Growth Stats API Hit");
        $week1 = User::where('created_at', '>=', Carbon::now()->subWeek())->count();
        $week2 = User::where('created_at', '>=', Carbon::now()->subWeeks(2))->count();
        $week3 = User::where('created_at', '>=', Carbon::now()->subWeeks(3))->count();
        $week4 = User::where('created_at', '>=', Carbon::now()->subWeeks(4))->count();
        
        $growth = array($week1, $week2, $week3, $week4);

        return response(array(
            'error' => false,
            'growth' => $growth,
        ), 200);
                      
    }
}
