 <h2>Recommended Articles</h2>
        
<div class="recommended-articles">
    @foreach($articles as $article)
    <div class="article">
        <a href="{{ url('/') }}/{{ $article->slug }}">
            <h2>{{ $article->title }} - <small>Elliot Forbes</small></h2>
        </a>
        <p>{{ $article->description }}</p>
        <a href="{{ url('/') }}/{{ $article->slug }}" class="waves-effect waves-light btn">Read More...</a>
    </div>
    @endforeach
</div>