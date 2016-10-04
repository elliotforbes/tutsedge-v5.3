@extends('layouts.app')

@section('title')
All Tutorials
@endsection

@section('meta')
<meta name="description" content="All Tutorials">
@endsection

@section('content')
<div class="container">
    <div class="course-container row">
    <h1>All Tutorials</h1>
    @foreach($lessons as $lesson)
        <div class="lesson col s12 m6 l4">
            <figure class="snip1253">
                <div class="image"><img src="{{ asset('/uploads/') }}/{{ $lesson->image_path }}" alt="sample52"/></div>
                <figcaption>
                    <div class="date"><span class="day">{{ date("d",strtotime($lesson->created_at)) }}</span><span class="month">{{ date("M",strtotime($lesson->created_at)) }}</span></div>
                    <h3>{{ $lesson->title }}</h3>
                    <p>
                        
                        {{ $lesson->description }}
                    </p>
                </figcaption>
                <footer>
                    <div class="views"><i class="ion-eye"></i>{{ $lesson->views }}</div>
                    <div class="love"><i class="ion-comment"></i>{{ count($lesson->comments) }}</div>
                     </footer><a href="{{url('/') }}/{{ $lesson->slug }}"></a>
            </figure>
        </div>
    @endforeach
    <div class="break"></div>
        
    <div class="pagination">
        <?php echo $lessons->render(); ?>
    </div>
    </div>
</div>
@endsection