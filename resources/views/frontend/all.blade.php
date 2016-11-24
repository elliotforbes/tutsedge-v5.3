@extends('layouts.app')

@section('title')
All Tutorials
@endsection

@section('meta')
<meta name="description" content="All Tutorials">
@endsection

@section('content')
<div class="container">
    <div class="course-container row">
    <h1>All Tutorials</h1>
    <div class="row flexbox-courses">
       @foreach($lessons as $lesson)
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
    <div class="break"></div>
        
    <div class="pagination">
        <?php echo $lessons->render(); ?>
    </div>
    </div>
</div>
</div>
@endsection