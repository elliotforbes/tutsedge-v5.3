@extends('layouts.app')

@section('title')
{{ $lesson->title }}
@endsection

@section('meta')
<meta name="description" content="{{ $lesson->description }}">
@endsection

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>{{ $lesson->title }}</h1>
        <h3>{{ $lesson->description }}</h3>
        <p class="post-info">{{ $lesson->author }} | {{ date("d M, Y",strtotime($course->created_at)) }} | <a href="#comments">Comments</a></p>
    </div>
</div>
@endsection

@section('content') 

<div class="content">
    <div class="row">

        <div class="col s12 m12 l9">
            <div class="post-body post-content">

                {!! Markdown::parse($lesson->body) !!}     

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

            </div><!-- .post-body -->

            <div class="recommended-articles">
                <div class="row">
                    <h1>Recommended Articles</h1>
                    @foreach($articles as $article)
                    <div class="col l4 m4 s12">
                        <div class="post">
                            <div class="post-image">
                                <img src="{{ asset('/uploads/') }}/{{ $article->image_path }}" alt="{{ $article->description }}">
                            </div>
                            <div class="post-link">
                                <a href="{{ url('/') }}/{{ $article->slug }}"><h3>{{ $article->title }}</h3></a>
                                <p>{{ $article->description }}</p>
                                <div class="tags">
                                    @foreach($article->tags as $tag)
                                    <a href="{{ url('/') }}/tag/{{ $tag->name }}">{{ $tag->name }}</a>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <div id="comments" class="comment-container">
                <div class="comments">
                <div id="disqus_thread"></div>
                <script>
                /**
                *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
                *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables */
            
                var disqus_config = function () {
                    this.page.url = '{{ Request::url() }}';  // Replace PAGE_URL with your page's canonical URL variable
                    this.page.identifier = '<?php echo $lesson->slug ?>'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                };
                
                (function() { // DON'T EDIT BELOW THIS LINE
                    var d = document, s = d.createElement('script');
                    s.src = '//tutorialedgenet.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                })();
                </script>
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                </div>
                <div class="clear"></div>
            </div>
        </div><!-- .col s9 -->
        
        <div class="sidebar col s12 m12 l3"><!-- .sidebar -->
            
           <div class="sidebar">
                <div class="related-posts">
                    <h2>Related Posts</h2>
                    @foreach ($articles as $article)
                    <div class="post">
                        <div class="post-image">
                            <img src="{{ asset('/uploads/') }}/{{ $article->image_path }}" alt="{{ $article->description }}">
                        </div>
                        <div class="post-link">
                            <a href="{{ url('/') }}/{{ $article->slug }}"><h3>{{ $article->title }}</h3></a>
                            <p>{{ $article->description }}</p>
                            <div class="tags">
                                @foreach($article->tags as $tag)
                                <a href="{{ url('/') }}/tag/{{ $tag->name }}">{{ $tag->name }}</a>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>

                <div class="course-info"><!-- .course-info -->        
                    <h5>Share This Post:</h5>
                    <!-- Go to www.addthis.com/dashboard to customize your tools -->
                    <div class="addthis_sharing_toolbox"></div>
                            
                </div><!-- .course-info -->

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

            </div>
            
        </div><!-- end of sidebar-->
        
    </div>
</div>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=emforce"></script>

@endsection