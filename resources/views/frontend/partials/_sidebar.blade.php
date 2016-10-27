<div class="sidebar">
    <div class="post-info row">
        <div class="post-views col l6">
            <p><span>2,345</span><br/>Views</p>
        </div>

        <div class="post-comments col l6">  
            <p><span><a href="#comments">{{ count($lesson->comments) }}</a></span><br/>Comments</p>
        </div>
        <div class="post-author col l12">
            <p><span>Elliot Forbes</span><br/>Author</p>
        </div>
        <div class="post-date col l12">
            <p><span>{{ date("d M, Y",strtotime($lesson->created_at)) }}</span><br/>Date Posted</p>
        </div>
    </div>

    

    <div class="course-info"><!-- .course-info -->
        <h5>Tags:</h5>
        @foreach ($lesson->tags as $tag)
            <a href="{{ url('/tag') }}/{{ $tag->name }}">
                <div class="chip">
                    {{ $tag->name }}
                </div>    
            </a>
        @endforeach
        
        <h5>Share This Post:</h5>
        <!-- Go to www.addthis.com/dashboard to customize your tools -->
        <div class="addthis_sharing_toolbox"></div>
                
    </div><!-- .course-info -->

    <!--<div class="register">
        <h2>Register Now:</h2>
        
        <p>Register now for free quickly using your preferred social media platform and receive the latest tutorials and updates straight to your inbox.</p>
        
        <div class="row">
            <div class="col s12 m6 l6">
                <a href="{{ url('/auth/facebook') }}"><button class="register-btn facebook"><i class="fa fa-facebook-square"></i> Facebook</button></a>
            </div>
            <div class="col s12 m6 l6">
                <a href="{{ url('/auth/twitter') }}"><button class="register-btn twitter"><i class="fa fa-twitter-square"></i> Twitter</button></a>
                <a href="{{ url('/auth/googleplus') }}"><button class="register-btn google-plus"><i class="fa fa-google-plus-square"></i> Google+</button></a>
            </div>
            <a href="{{ url('/auth/github') }}"><button class="register-btn github"><i class="fa fa-github-square"></i> Github</button></a>
        </div>
    </div> .register -->

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

    <div class="clear"></div>

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
</div>