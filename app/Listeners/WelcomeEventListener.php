<?php

namespace App\Listeners;

use App\Events\WelcomeEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

class WelcomeEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  SomeEvent  $event
     * @return void
     */
    public function handle(WelcomeEvent $event)
    {
        Mail::to($event->email)->send(new WelcomeEmail($event->$user));
    }
}
