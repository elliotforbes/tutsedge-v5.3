<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Socialite;
use Log;

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
        $redirectUrl = "https://tutorialedge.net/auth/github/callback";
        return Socialite::driver('github')->redirectUrL($redirectUrl)->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Response
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('github')->user();

        auth()->login($user);

        Log::info("Successfully Logged In User");

    }
}