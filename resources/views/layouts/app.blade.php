<!DOCTYPE html>
<html lang="en">
    <head>
        <title>@yield('title') | TutorialEdge.net</title>
        
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="google-site-verification" content="o0UedRQqZULbVZPe6SPx1VD1YxJd6WL-2-15-XHWS1g" />
        <meta name="msvalidate.01" content="479C48823705295AF4454A1704545592" />
		<link rel="author" href="https://plus.google.com/b/115194233692529836662">
		<meta property="og:site_name" content="TutorialEdge.net" />
        
        <link href="https://fonts.googleapis.com/css?family=Raleway:900" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/monokai.min.css">
        <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <link rel="stylesheet" href="{{ asset('/css/materialize.min.css', Request::secure() )  }}">
        <link rel="stylesheet" href="{{ asset('/css/front-end.css' , Request::secure() ) }}?v=53">
        <link rel="icon" type="image/png" href="{{ asset('/favicon.ico', Request::secure()) }}">
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="{{ asset('/js/highlight.pack.js', Request::secure()) }}"></script>
        <script>hljs.initHighlightingOnLoad();</script>
        
        @yield('meta')
         <script async>
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
        
        
        <div class="navbar">
              <nav class="nav-extended">
                <div class="nav-wrapper">
                <a href="{{ url('/') }}" class="brand-logo"><span>Tutorial</span>Edge.net</a>
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <!--<li><a href="#"><div class="online-dot"></div> 15 Users Online</a></li>-->
                    <li><a href="{{ url('/search') }}">Search</a></li>
                    <li><a href="{{ url('/blog') }}">Blog</a></li>
                    <li><a href="{{ url('/about') }}">About</a></li>
                    @if (Auth::guest())
                    <li>
                        <a href="{{ url('/auth/github') }}">Register</a>
                    </li>
                    @else
                    <li class="profile">
                        <a href="{{ url('/profile') }}">Profile</a>
                        <div class="profile-content">
                            <div class="row border-bottom">
                                <div class="col l6 m6 s12">
                                    <h3>Profile<br/><small><div class="online-dot"></div> Online</small></h3>
                                </div>
                                <div class="col l6 m6 s12 logout">
                                    <a href="{{ url('/logout') }}"><i class="ion ion-power"></i> LOGOUT</a>
                                </div>
                            </div>
                            <h5>New Notifications <span>1</span></h5>
                            <ul>
                                <li>
                                    <a href="/profile">
                                        <div class="message-icon"><i class="ion ion-ios-email"></i></div>
                                        <span class="header">Welcome To TutorialEdge</span><br/>
                                        <span class="date">5th December, 2016 @ 6:30pm</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    @endif
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li><a href="{{ url('/search') }}">Search</a></li>
                    <li><a href="{{ url('/blog') }}">Blog</a></li>
                    <li><a href="{{ url('/about') }}">About</a></li>
                    @if (Auth::guest())
                    <li><a href="{{ url('/auth/github') }}">Register</a></li>
                    @else
                    <li><a href="{{ url('/profile') }}">Profile</a></li>
                    @endif
                </ul>

                <ul class="tab-nav">
                    <li class="tab"><a target="_self" href="{{ url('/course') }}/angular-2-fundamentals"><img src="{{ asset('/uploads/angular-logo.png') }}" alt="Angular 2 Fundamentals"> <span class="hide-on-small-only">Angular 2</span></a></li>
                    <li class="tab"><a target="_self" href="{{ url('/course') }}/angular-js-fundamentals"><img src="{{ asset('/uploads/angular-logo.png') }}" alt="AngularJS"> <span class="hide-on-small-only">AngularJS</span></a></li>
                    <li class="tab"><a target="_self" href="{{ url('/course') }}/golang"><img src="{{ asset('/uploads/go-logo.png') }}" alt="golang tutorials"> <span class="hide-on-small-only">Golang</span></a></li>
                    <li class="tab"><a target="_self" href="{{ url('/course') }}/laravel-5"><img src="{{ asset('/uploads/laravel-logo.png') }}" alt="laravel 5.3 tutorials"> <span class="hide-on-small-only">Laravel</span></a></li>
                    <li class="tab"><a target="_self" href="{{ url('/course') }}/python"><img src="{{ asset('/uploads/python-logo.png') }}" alt="Python Tutorials"> <span class="hide-on-small-only">Python</span></a></li>
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
                  <!--<li><a class="text-lighten-3" href="{{ url('/advertise') }}">Advertise</a></li>-->
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
        <!-- Compiled and minified JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
        
        <script type="text/javascript" src="{{ asset('/js/site-scripts.js', Request::secure()) }}"></script>  
    </body>    
</html>