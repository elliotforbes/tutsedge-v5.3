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
    <h3>All Courses</h3>
    <div class="row flexbox-courses">
            
            <div class="col l4 m4 s12 course-container">
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
        
        
            <div class="col l4 m4 s12 course-container">            
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
        
        
            <div class="col l4 m4 s12 course-container">
                <div class="course-box">
                    <div class="course-image">
                        <img src="{{ asset('/uploads/laravel-5.png') }}">
                        
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
    <div class="break"></div>
        
    <div class="pagination">
        <?php echo $courses->render(); ?>
    </div>
    </div>
</div>
@endsection
