@extends('layouts.app')

@section('title')
All Courses
@endsection

@section('meta')
<meta name="description" content="All Courses">
@endsection

@section('content')
<div class="container">
    <div class="course-container row">
    <h1>All Courses</h1>
    @foreach($courses as $course)
        <div class="col s12 m6 l4">
            <div class="card">
                <div class="card-image">
                    <img src="{{ asset('/uploads/artificial-intelligence.jpg') }}">
                </div>
                <div class="card-content">
                    <h5>{{ $course->title }}</h5>
                    <p>{{ $course->description }}</p>
                </div>
                <div class="card-action">
                <a href="{{ url('/course') }}/{{ $course->slug }}">View Now</a>
                </div>
            </div>
        </div>
    @endforeach
    <div class="break"></div>
        
    <div class="pagination">
        <?php echo $courses->render(); ?>
    </div>
    </div>
</div>

<div class="gray-container">
    <div class="container center">
        <h2>Become a part of TutorialEdge</h2>
        <p>TutorialEdge.net has been growing for over a year new and we've seen hundreds of thousands of visitors to the site. Join the growing list of developers who have registered for the site and receive free newletters on the latest industry news as well as top articles.</p>
        <a href="{{ url('/auth/github') }}"><button class="btn btn-default">+ Register Now</button></a>
        <div class="break"></div>
    </div>
</div>
@endsection
