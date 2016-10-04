@extends('layouts.app')

@section('title')
{{ $post->title }}
@endsection

@section('meta')
<meta name="description" content="{{ $post->description }}">
@endsection

@section('content')
<div class="container">
    <div class="content">
        <div class="post-body">
            <h1>{{ $post->title }}</h1>
        
            <div class="info">
                {{ $post->author }} 
                | {{ date("d M, Y",strtotime($post->created_at)) }}
            </div>
            {!! $post->body !!}            
        </div>
    </div>
</div><!-- .container -->
@endsection