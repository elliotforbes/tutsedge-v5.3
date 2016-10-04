@extends('layouts.app')

@section('title')
The Story
@endsection

@section('meta')
<meta name="description" content="The Story">
@endsection

@section('content')
<div class="content">
    <div class="post-body">
        <h1>The Story:</h1>
        <p><strong>Originally started in December of 2014</strong> this site began as a side hobby of mine and has quickly grown into one of the most successful side projects I've ever worked upon. Since it's conception it's racked up well over 100,000 page views and it's still growing.</p>
        
        <p>It's undergone <b>many changes</b> since it was first created and overall I've probably commited well over 1,000 hours towards the site and it's content. This is something I use to hone my own programming skills and I use it as a means of expanding my programming horizons by encouraging me to move into new areas that I've never touched before.</p>
        
        <h2>The Code</h2>
        
        <p><strong>For those interested</strong> in what the code base looks like for the <b>entire</b> website then be sure to check out this github repo: <a href="https://github.com/emforce/tutorialedge-new">https://github.com/emforce/tutorialedge-new</a></p>
        
        <h2>The Growth</h2>
        
        <p>Since it's inception the site's shown good growth and now exceeds <b>12,500 hits per month</b> and the growth doesn't seem to be slowing down. My main aim for the site is to become one of the best free resources on the web for learning how to program using various new and emeging frameworks such as Laravel 5 for web development and Java + OpenGL for game development.</p>
        
        <img src="{{ asset('/images/growth.png') }}" alt="Google Stats" >
        
        <h2>The 6 Month Plan</h2>
        
        <p>My plan for the site is to hit the 100 complete tutorials milestone and get the new forum system up and running so that the site can continue to grow and provide help on all aspects of web development. I hope to build a thriving online community that will become the authority on all things web development related.</p>

        
    </div>
</div>
@endsection