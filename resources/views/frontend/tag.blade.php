@extends('layouts.app')

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>{{ $tag->name }}</h1>
    </div>
</div>
@endsection

@section('content')
<div class="container">
    <div class="course-container">
        <div class="row flexbox-courses">
            @foreach($articles as $lesson)
                <div class="col l4 m4 s12 course-container">
                <div class="course-box">
                    <div class="course-image">
                        <img src="{{ asset('/uploads/') }}/{{ $lesson->image_path }}" alt="{{ $lesson->description }}">
                    </div>
                    <div class="course-content">
                    <h5 class="course-title">{{ $lesson->title }}</h5>
                    <p>{{ $lesson->description }}</p>
                    </div>
                    <div class="course-action">
                    <a href="{{url('/') }}/{{ $lesson->slug }}">Read More</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection