@extends('layouts.app')

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>Programming Book Reviews</h1>
        <h3>Register to receive the latest news and updates on all your favorite frameworks</h3>
        <div class="row">
            <div class="col offset-l5 l2"></div>
            <a href="{{ url('/auth/github') }}"><button class="register-btn">Register with Github Now</button></a>
        </div>
    </div>
</div>
@endsection

@section('content')
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