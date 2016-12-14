@extends('layouts.app')

@section('title')
Register Now
@endsection

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>Register Now</h1>
        <h3>Get up to date tutorials delivered straight to your inbox!</h3>
    </div>
</div>
@endsection

@section('content')
<div class="container">
    <div class="content">
        <div class="post-body center">   
            <div class="row">
                <div class="col l4">
                    <a href="{{ url('/auth/github') }}"><button class="btn github center-align"><i class="fa fa-github-square"></i> Register with Github</button></a>
                </div>
                <div class="col l4">
                    <a href="{{ url('/auth/twitter') }}"><button class="btn twitter"><i class="fa fa-twitter-square"></i> Register with Twiter</button></a>
                </div>
                <div class="col l4">
                    <a href="{{ url('/auth/facebook') }}"><button class="btn facebook"><i class="fa fa-facebook-square"></i> Register with Facebook</button></a>
                </div>
            </div>

            <br/>
            
            <p>You cannot view the profile page as you are not currently logged in. Please log in or register for an account here: </p>
            
            <h4>Join the Growing Community of Developers</h4>
            
            <p>TutorialEdge.net looks to provide the <b>highest quality, most in-depth</b> learning resources online for those wishing to program.</p>
            
            <div class="center">
                <div class="break"></div>
            </div>
        </div>
    </div>
</div>

@endsection