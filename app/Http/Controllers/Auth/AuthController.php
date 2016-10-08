<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Socialite;
use Log;
use App\User;

class AuthController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return Response
     */
    public function redirectToProvider()
    {
        Log::info("HIT");
        $redirectUrl = "https://tutorialedge.net/login";
        return Socialite::driver('github')->redirectUrL($redirectUrl)->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Response
     */
    public function handleProviderCallback()
    {
        $githubUser = Socialite::driver('github')->stateless()->user();
        Log::info($githubUser);
        
        $user = User::where('github_id', $githubUser->email)->first();
        
        Log::info($user);

        Auth::login($user);

        Log::info("Successfully Logged In User");

        return redirect('/');

    }
}