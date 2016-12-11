<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Mail\NewUser;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    
    public function test() 
    {
        $user = new User();
        $user->name = 'Test';

        Mail::to('elliot@elliotforbes.co.uk')->send(new NewUser($user));
    }

}
