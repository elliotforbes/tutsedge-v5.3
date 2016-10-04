@extends('layouts.app')

@section('banner')
<div class="gray-container">
    <div class="content">
        <h1>{{ $tag->name }}</h1>
        <h5 class="center-align">All Articles For Tag: {{ $tag->name }}</h5>
    </div>
</div>
@endsection

@section('content')
<div class="content">
    <div class="row">
        @foreach($articles as $article)
            <div class="col s12 m12 l12">
                <div class="card-panel white">
                <div class="icon valign-wrapper">
                    <i class="material-icons">description</i>
                </div>
                <a href="{{ url('/') }}/{{ $article->slug }}">
                <h5>{{ $article->title }}</h5>
                </a>
                <span><b>{{ $article->author }} @ {{ date("d M, Y",strtotime($article->created_at)) }}</b> : {{ $article->description }}
                </span>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection