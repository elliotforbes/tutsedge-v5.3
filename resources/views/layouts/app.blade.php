<!DOCTYPE html>
<html lang="en">
    <head>
        <title>@yield('title') | TutorialEdge.net</title>
        
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="google-site-verification" content="o0UedRQqZULbVZPe6SPx1VD1YxJd6WL-2-15-XHWS1g" />
		<link rel="author" href="https://plus.google.com/b/115194233692529836662">
		<meta property="og:site_name" content="TutorialEdge.net" />
 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/monokai.min.css">
        <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <link rel="stylesheet" href="{{ asset('/css/materialize.min.css', Request::secure() )  }}">
        <link rel="stylesheet" href="{{ asset('/css/front-end.css' , Request::secure() ) }}?v=41">
        <link rel="icon" type="image/png" href="{{ asset('/favicon.ico', Request::secure()) }}">

        <script async type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
        <script async src="{{ asset('/js/highlight.pack.js', Request::secure()) }}"></script>
        <script>hljs.initHighlightingOnLoad();</script>
        @yield('meta')
        
         <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
            ga('create', 'UA-10255990-23', 'auto');
            ga('send', 'pageview');
        </script>
    </head>
    <body>
        
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                <a href="{{ url('/') }}" class="brand-logo">TutorialEdge.net</a>
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <!--<li><a href="{{ url('/books') }}">Book Store</a></li>-->
                    <li><a href="{{ url('/search') }}">Search</a></li>
                    <li><a href="{{ url('/courses') }}">Courses</a></li>
                    <li><a href="{{ url('/blog') }}">Blog</a></li>
                    <li><a href="{{ url('/tutorials') }}">Tutorials</a></li>
                    @if (Auth::guest())
                    <li><a class="github-signin" href="{{ url('/auth/github') }}">Register/Sign-In With Github</a></li>
                    @else
                    <li><a class="github-signin" href="{{ url('/profile') }}">Profile</a></li>
                    @endif
                    
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li><a href="{{ url('/search') }}">Search</a></li>
                    <li><a href="{{ url('/tutorials') }}">Tutorials</a></li>
                    <li><a href="{{ url('/blog') }}">Blog</a></li>
                    <li><a href="{{ url('/books') }}">Books</a></li>
                    <li><a href="{{ url('/courses') }}">Courses</a></li>
                    @if (Auth::guest())
                    <li><a href="{{ url('/auth/github') }}">Register With Github</a></li>
                    @else
                    <li><a href="{{ url('/profile') }}">Profile</a></li>
                    @endif
                </ul>
                </div>
            </nav>
        </div>
        
        @yield('banner')
        
        @yield('content')
        
        <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5>TutorialEdge.net</h5>
                <p class="text-lighten-4">This site is dedicated to bringing you the highest quality courses designed to teach you the ins and outs of programming with various frameworks and programming languages.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5>Links</h5>
                <ul>
                  <li><a class="text-lighten-3" href="{{ url('/tutorials') }}">All Tutorials</a></li>
                  <li><a class="text-lighten-3" href="{{ url('/books') }}">Books</a></li>
                  <li><a class="text-lighten-3" href="{{ url('/contact') }}">Contact</a></li>
                  <li><a class="text-lighten-3" href="{{ url('/courses') }}">Courses</a></li>
                  <li><a class="text-lighten-3" href="{{ url('/blog') }}">Blog</a></li>
                  <li><a class="text-lighten-3" href="{{ url('/about') }}">About</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            TutorialEdge © 2016 Copyright 
            </div>
          </div>
        </footer>
        
        <!--Import jQuery before materialize.js-->
        <script async src="https://use.fontawesome.com/9b263d09bd.js"></script>
        <script async type="text/javascript" src="{{ asset('/js/jquery.min.js', Request::secure()) }}"></script>
        <script async type="text/javascript" src="{{ asset('/js/materialize.min.js', Request::secure()) }}"></script>
        <script async type="text/javascript" src="{{ asset('/js/site-scripts.js', Request::secure()) }}"></script>
    </body>    
</html>