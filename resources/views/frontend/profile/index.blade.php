@extends('layouts.app')

@section('banner')
<div class="banner">
    <div class="banner-cont">
        <h1>{{ $user->name }}</h1>
        <h3>Date Joined: {{ $user->created_at }}<br/>
        Email: {{ $user->email }}</h3>
    </div>
</div>
@endsection

@section('content')
<div class="container">
    <div class="content">
        <div class="post-body">
            <h2>Notifications</h2>

            <p>Welcome To TutorialEdge.net!</p>
            <p>More Controls will be added to this page shortly. If you need to get in touch then please do at elliot@elliotforbes.co.uk</p>
        </div>
    </div>
</div>

@endsection