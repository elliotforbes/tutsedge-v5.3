@extends('layouts.app')

@section('title')
Temp Title
@endsection

@section('meta')
<meta name="description" content="temp"/>
@endsection

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>{{ $course->title }}</h1>
        <h3>Register to receive the latest news and updates on all your favorite frameworks</h3>
        <div class="row">
            <div class="col offset-l5 l2"></div>
            <a href="{{ url('/auth/github') }}"><button class="register-btn">Register with Github Now</button></a>
        </div>
    </div>
</div>
@endsection

@section('content')
<div class="content">
    <div class="post-body">
        <h2>Temp</h2>
    </div>
</div>
@endsection