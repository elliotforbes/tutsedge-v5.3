@extends('layouts.app')

@section('title')
{{ $book->book_name }}
@endsection

@section('meta')
<meta name="description" content="{{ $book->description }}">
@endsection

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>{{ $book->book_name }} Review</h1>
        <div class="row">
            <div class="col offset-l5 l2"></div>
            <a href="{{ url('/auth/github') }}"><button class="register-btn">Register with Github Now</button></a>
        </div>
    </div>
</div>
@endsection

@section('content')

<div class="content">
    <div class="row">
        <div class="col s12 m8 l8">
            <div class="post-body">
                {!! $book->body !!}    
                
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- article ad -->
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-6782067367590597"
                    data-ad-slot="5293007688"
                    data-ad-format="auto"></ins>
                <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
                        
            </div>
        </div><!-- .col -->
        <div class="sidebar col s12 m4 l4">
            <div class="course-info">
                <h2>Review Information:</h2>
                <p><b>Author:</b> Elliot Forbes</p>
                <p><b>Date Published: </b> {{ date("d M, Y",strtotime($book->created_at)) }}</p>
            </div><!-- .info -->
            
             <div class="register"><!-- .register -->
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
                </div>
            </div><!-- .register -->
            
            <div class="ad"><!-- .ad -->
                <h2>Sponsor Us:</h2>
               <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- article ad -->
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-6782067367590597"
                    data-ad-slot="5293007688"
                    data-ad-format="auto"></ins>
                <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
                
                 <p>Want to see your own advertisement here, check out the <a href="{{ url('/contact') }}">contact page</a></p>
                
            </div> <!-- .ad -->
        </div>
    </div><!-- .row -->
</div>
<div class="comment-container">
    <div class="comments">
    @include('frontend.partials._author')
    </div>
    <div class="clear"></div>
</div>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=emforce"></script>

@endsection