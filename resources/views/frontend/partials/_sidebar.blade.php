<div class="post-info">
    <h2>Post Info:</h2>
    <div class="info"><!-- .info -->
        <p><b>Author:</b> Elliot Forbes</p>
        <p><b>Date Posted:</b> {{ date("d M, Y",strtotime($lesson->created_at)) }}</p>
        <p><b>Comments:</b> <a href="#comments">{{ count($lesson->comments) }}</a></p>
        <p><b>Views:</b> {{ $lesson->views }}</p>
        
    </div><!-- .info. -->
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

