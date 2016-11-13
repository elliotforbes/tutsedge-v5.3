@extends('layouts.app')

@section('title')
The Home of High Quality Programming Tutorials
@endsection

@section('meta')
<meta name="description" content="A Game Development Tutorial site focused on bringing you high quality programming courses...">
@endsection

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>Learn: How to Program</h1>
        <h3>Our Goal is to help new developers land their dream jobs<br/>
by teaching you some of the latest and greatest programming frameworks.</h3>
    </div>
</div>
@endsection

@section('content')

<div class="gray-container">
    <div class="container">
        <h4>Courses</h4>
        <div class="row flexbox-courses">
            
            <div class="col l4 m4 s6 course-container">
                <div class="course-box">
                    <div class="course-image">
                        <img src="{{ asset('/uploads/AngularJS-header-image.png') }}">
                    </div>
                    <div class="course-content">
                        <h5>AngularJS Fundamentals</h5>
                        <p>Build your very own AngularJS Applications from the ground up and learn how to deliver high quality SPAs</p>
                    </div>
                    <div class="course-action">
                    <a href="{{ url('/course') }}/angular-js-fundamentals">View Now</a>
                    </div>
                </div>
            </div>
        
        
            <div class="col l4 m4 s6 course-container">            
                <div class="course-box">
                    <div class="course-image">
                        <img src="{{ asset('/uploads/lwjgl3.png') }}">
                        
                    </div>
                    <div class="course-content">
                        <h5>LWJGL 3</h5>
                        <p>Learn the basics of Graphics and Game programming using Java and the highly popular Lightweight Java Game Library 3.</p>
                    </div>
                    <div class="course-action">
                    <a href="{{ url('/course') }}/lwjgl-3-fundamentals">View Now</a>
                    </div>
                </div>
            </div>
        
        
            <div class="col l4 m4 s6 course-container">
                <div class="course-box">
                    <div class="course-image">
                        <img src="{{ asset('/uploads/laravel-5.jpg') }}">
                        
                    </div>
                    <div class="course-content">
                        <h5>Laravel 5.2 Fundamentals</h5>
                        <p>In this course we cover the basics for creating a web application using the Laravel 5.2 PHP framework.</p>
                    </div>
                    <div class="course-action">
                    <a href="{{ url('/course') }}/laravel-5">View Now</a>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</div>

<div class="container">
    <div class="course-container">
        <h4>Tutorials:</h4>
        <div class="row flexbox-courses">
        @foreach($lessons as $lesson)
        <div class="card">
          
            <div class="card-image">
                <img src="{{ asset('/uploads/') }}/{{ $lesson->image_path }}" alt="{{ $lesson->description }}">
            </div>
            <div class="card-content">
              <span class="card-title">{{ $lesson->title }}</span>
              <p>{{ $lesson->description }}</p>
            </div>
            <div class="card-action">
              <a href="{{url('/') }}/{{ $lesson->slug }}">Read More</a>
            </div>
        </div>
        @endforeach
        </div>
        
        <div class="break"></div>
        
        <div class="pagination">
            <?php echo $lessons->render(); ?>
        </div>
    </div>
</div>

<div class="gray-container">
    <div class="container">
        <div class="row">

        <div class="col s12 m6 l4 promo">
            <i class="material-icons">flash_on</i>
            <h5>Learn the latest and greatest frameworks</h5>
            <p>Follow our courses and learn how to use the latest frameworks whilst developing your own applications and websites.</p>
        </div>
        <div class="col s12 m6 l4 promo">
            <i class="material-icons">group</i>
            <h5>Join the Community</h5>
            <p>Participate in a discussion about your favourite tools and new packages or ask for advice on how to tackle a specific programming challenge on our new forums.</p>
        </div>
        <div class="col s12 m6 l4 promo">
            <i class="material-icons">trending_up</i>
            <h5>Level up your development skills</h5>
            <p>Learn new programming skills that could ultimately seal you your dream job.</p>
        </div>

        </div>
    </div>
</div>

<div class="clear"></div>

@endsection