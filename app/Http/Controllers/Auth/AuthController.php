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
        Log::info($githubUser->id);
        
        $authUser = $this->findOrCreateUser($user);

        Auth::login($authUser, true);
                
        return redirect('/');

    }


    /**
     * Return user if exists; create and return if doesn't
     *
     * @param $githubUser
     * @return User
     */
    private function findOrCreateUser($githubUser)
    {   
        Log::info("Finding or Creating a User");
        
        if ($authUser = User::where('github_id', $githubUser->id)->first()) {
            Log::info("User Found");
            Auth::login($authUser);
            Log::info("Logging in existing user");
            return $authUser;
        }
        
        Log::info("Creating a new user");
        // Event::fire(new UserCreatedEvent($githubUser));
        return User::create([
            'name' => $githubUser->nickname,
            'email' => $githubUser->email,
            'github_id' => $githubUser->id,
            'avatar' => $githubUser->avatar
        ]);
    }
}