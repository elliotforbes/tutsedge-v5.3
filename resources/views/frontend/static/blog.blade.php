@extends('layouts.app')

@section('title')
The Blog
@endsection

@section('meta')
<meta name="description" content="All Blog Posts">
@endsection

@section('content')
<div class="container">
    <div class="content">
        <h1>The Blog</h1>
        @foreach($posts as $post)
        <div class="result">
            <h4>{{ $post->title }}</h4>
            <p>
                <strong>{{ $post->author }} posted at: {{ date("d M, Y",strtotime($post->created_at)) }}</strong>
                <br/>{{ $post->description }}
            </p>
            <a href="{{ url('/blog') }}/{{ $post->slug }}">
                <button class="btn waves-effect waves-light" type="submit" name="action">Read Now...
                    <i class="material-icons right">send</i>
                </button>
            </a>
        </div>
        @endforeach
    </div>
</div>
@endsection