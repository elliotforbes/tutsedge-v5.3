@extends('layouts.app')

@section('title')
{{ $lesson->title }}
@endsection

@section('meta')
<meta name="description" content="{{ $lesson->description }}">
@endsection

@section('content')

<div class="content">
    <div class="row">

        <div class="col s12 m12 l9">
            <!--<div class="post-image">
                <img src="{{ asset('/uploads/') }}/{{ $lesson->image_path }}" alt="">
            </div>-->            
            <div class="post-body">

                <div class="post-title">
                    <h1>{!! $lesson->title !!}</h1>
                </div>  
                

                <div class="clear"></div>


                {!! Markdown::parse($lesson->body) !!}                    
            </div><!-- .post-body -->

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
        
        <div class="col s12 m12 l3"><!-- .sidebar -->
            <div class="left-sidebar">
                <div class="left-sidebar-content">
                    <img src="https://avatars0.githubusercontent.com/u/3332224?v=3&s=466" alt="">
                    <h2>{!! $lesson->author !!}</h2>
                    <h4>Software Engineer</h4>

                    <p>23 Year old Software Engineer who loves all manner of front end programing.</p>
                </div>
                <div class="social-links">
                    <h4>Follow Me</h4>
                    <div class="row">
                        <div class="col s12 m3 l3">
                        </div>
                        <div class="col s12 m3 l3">
                            <div class="twitter center">
                                <a target="_blank" href="https://twitter.com/Elliot_F"><i class="ion ion-social-twitter"></i></a>
                            </div>
                        </div>
                        <div class="col s12 m3 l3">
                            <div class="github center">
                                <a target="_blank" href="https://github.com/emforce"><i class="ion ion-social-github"></i></a>
                            </div>
                        </div>
                        <div class="col s12 m3 l3">
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="sidebar">
                @include('frontend.partials._sidebar')
            </div>
        </div><!-- end of sidebar-->
        
    </div>
</div>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=emforce"></script>

@endsection