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
        <div class="col s12 m9 l9">
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
        <div class="sidebar col s12 m3 l3">
            <div class="left-sidebar-content">
                <img src="https://avatars0.githubusercontent.com/u/3332224?v=3&s=466" alt="Elliot Forbes Web Developer">
                <h2>Elliot Forbes</h2>
                <h4>Software Engineer</h4>

                <p>23 Year old Software Engineer who loves all manner of front end programing.</p>
                <div class="social-links register">
                    <h4>Follow Me</h4>
                    <a target="_blank" href="https://twitter.com/Elliot_F"><button class="register-btn twitter"><i class="fa fa-twitter-square"></i> Twitter</button></a>
                    <a target="_blank" href="https://www.facebook.com/tutorialedge"><button class="register-btn facebook"><i class="fa fa-facebook-square"></i> Facebook</button></a>             
                    <a target="_blank" href="https://github.com/emforce"><button class="register-btn github"><i class="fa fa-github-square"></i> Github</button></a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCwFl9Y49sWChrddQTD9QhRA"><button class="register-btn youtube"><i class="fa fa-youtube-square"></i> Youtube</button></a>
                </div>
            </div>

            <div class="course-info">
                <h2>Review Information:</h2>
                <p><b>Author:</b> Elliot Forbes</p>
                <p><b>Date Published: </b> {{ date("d M, Y",strtotime($book->created_at)) }}</p>
            </div><!-- .info -->
            
             
            
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
    </div><!-- .row -->
</div>

@endsection