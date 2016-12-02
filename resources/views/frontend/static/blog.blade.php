@extends('layouts.app')

@section('title')
The Blog
@endsection

@section('meta')
<meta name="description" content="All Blog Posts">
@endsection

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>TutorialEdge Blog</h1>
        <h3>Register to receive the latest news and updates on all your favorite frameworks</h3>
        <div class="row">
            <div class="col offset-l5 l2"></div>
            <a href="{{ url('/auth/github') }}"><button class="register-btn">Register with Github Now</button></a>
        </div>
    </div>
</div>
@endsection

@section('content')
<div class="container">
    <div class="course-container row">
    @foreach($posts as $post)
    <div class="col l4 m4 s12 course-container">
        <div class="course-box">
            <div class="course-content">
            <h5 class="course-title">{{ $post->title }}</h5>
            <p>{{ $post->description }}</p>
            </div>
            <div class="course-action">
            <a href="{{url('/') }}/{{ $post->slug }}">Read More</a>
            </div>
        </div>
    </div>
    @endforeach
    </div>
</div>
@endsection