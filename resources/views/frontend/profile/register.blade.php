@extends('layouts.app')

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>Register Now</h1>
        <h3>Get up to date tutorials delivered straight to your inbox!</h3>
        <div class="row">
            <div class="col offset-l5 l2"></div>
            <a href="{{ url('/auth/github') }}"><button class="register-btn">Register with Github Now</button></a>
        </div>
    </div>
</div>
@endsection

@section('content')
<div class="content center">
    <p>You cannot view the profile page as you are not currently logged in. Please log in or register for an account here: </p>
    
    <h4>Join the Growing Community of Developers</h4>
    
    <p>TutorialEdge.net looks to provide the <b>highest quality, most in-depth</b> learning resources online for those wishing to program.</p>
    
    <div class="center">
        <div class="break"></div>
    </div>
</div>

@endsection