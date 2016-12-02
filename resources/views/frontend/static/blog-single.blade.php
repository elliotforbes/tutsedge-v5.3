@extends('layouts.app')

@section('title')
{{ $post->title }}
@endsection

@section('meta')
<meta name="description" content="{{ $post->description }}">
@endsection

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>{{$post->title}}</h1>
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
    <div class="content">
        <div class="post-body">        
            <div class="info">
                {{ $post->author }} 
                | {{ date("d M, Y",strtotime($post->created_at)) }}
            </div>
            {!! $post->body !!}            
        </div>
    </div>
</div><!-- .container -->
@endsection