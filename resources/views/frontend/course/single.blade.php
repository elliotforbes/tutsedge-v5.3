@extends('layouts.app')

@section('title')
{{ $course->title }}
@endsection

@section('meta')
<meta name="description" content="{{ $course->description }}">
@endsection

@section('content')
<div class="content">
    <div class="row">
        <div class="col s12 m12 l2">
            <div class="left-sidebar">
                <div class="left-sidebar-content">
                    <img src="https://avatars0.githubusercontent.com/u/3332224?v=3&s=466" alt="">
                    <h2>{!! $course->author !!}</h2>
                    <h4>Software Engineer</h4>

                    <p>23 Year old Software Engineer who loves all manner of front end programing.</p>
                </div>
                <div class="social-links">
                    <h4>Follow Me</h4>
                    <div class="row">
                        <div class="col s12 m6 l3">
                            <div class="twitter">
                                <a target="_blank" href="https://twitter.com/Elliot_F"><i class="ion ion-social-twitter"></i></a>
                            </div>
                        </div>
                        <div class="col s12 m6 l3">
                            <div class="facebook">
                                <a target="_blank" href="https://www.facebook.com/tutorialedge"><i class="ion ion-social-facebook"></i></a>
                            </div>
                        </div>
                        <div class="col s12 m6 l3">
                            <div class="github">
                                <a target="_blank" href="https://github.com/emforce"><i class="ion ion-social-github"></i></a>
                            </div>
                        </div>
                        <div class="col s12 m6 l3">
                            <div class="youtube">
                                <a target="_blank" href="https://www.youtube.com/channel/UCwFl9Y49sWChrddQTD9QhRA"><i class="ion ion-social-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>

        
        <div class="col s12 m8 l7">
            <div class="post-body">  
                <h1>{{ $course->title }}</h1>
                {!! Markdown::parse($course->body) !!}
                
                @include('frontend.partials._ad')
            </div>
        </div><!-- .col -->
        
        <div class="sidebar col s12 m4 l3">
            <div class="course-info">
                <h2>Course Information:</h2>
                <p><b>Author:</b> {{ $course->author }}</p>
                <p><b>Date Published: </b> {{ date("d M, Y",strtotime($course->created_at)) }}</p>
            </div><!-- .course-info -->
            
             <div class="register">
                <h2>Register Now:</h2>
                
                <p>Register now for free quickly using your preferred social media platform and receive the latest tutorials and updates straight to your inbox.</p>
                
                <div class="row">
                    <!--<div class="col s12 m6 l6">
                        <a href="{{ url('/auth/facebook') }}"><button class="register-btn facebook"><i class="fa fa-facebook-square"></i> Facebook</button></a>
                    </div>
                    <div class="col s12 m6 l6">
                        <a href="{{ url('/auth/twitter') }}"><button class="register-btn twitter"><i class="fa fa-twitter-square"></i> Twitter</button></a>
                        <a href="{{ url('/auth/googleplus') }}"><button class="register-btn google-plus"><i class="fa fa-google-plus-square"></i> Google+</button></a>
                    </div>-->
                    <a href="{{ url('/auth/github') }}"><button class="register-btn github"><i class="fa fa-github-square"></i> Github</button></a>
                </div><!-- .row -->
            </div><!-- .register -->
            
            <div class="ad"><!-- .ad -->
                <h2>Sponsor Us:</h2>
               @include('frontend.partials._ad')
                
                 <p>Want to see your own advertisement here, check out the <a href="{{ url('/contact') }}">contact page</a></p>
                
            </div> <!-- .ad -->
        </div><!-- .sidebar -->
        
        
        
    </div><!-- .row -->
</div><!-- .content -->

@endsection