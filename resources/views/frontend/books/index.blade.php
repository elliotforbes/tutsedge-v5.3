@extends('layouts.app')

@section('content')
<div class="gray-container">
    <div class="content">
        <h1>Programming Book Reviews:</h1>
    </div>
</div>

<div class="container">
    <div class="course-container row">
        @foreach($books as $book)
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="{{ asset('/uploads/artificial-intelligence.jpg') }}">
                    </div>
                    <div class="card-content">
                        <h5>{{ $book->book_name }}</h5>
                        <p>{{ date("d M, Y",strtotime($book->created_at)) }}</p>
                    </div>
                    <div class="card-action">
                    <a href="{{ url('/book') }}/{{ $book->slug }}">Read Now</a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>

@endsection