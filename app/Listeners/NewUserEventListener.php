<?php

namespace App\Listeners;

use App\Events\NewUserEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Mail\NewUser;
use Illuminate\Support\Facades\Mail;
use Log;

class NewUserEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Handle the event.
     *
     * @param  SomeEvent  $event
     * @return void
     */
    public function handle(NewUserEvent $event)
    {
        Log::info($event->$user);
        Mail::to('elliot@elliotforbes.co.uk')->send(new NewUser($event->$user));
    }
}
