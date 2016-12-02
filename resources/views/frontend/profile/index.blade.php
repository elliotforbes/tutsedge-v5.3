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
<div class="content">
    <div class="container">
        <div class="row">
            <h2>This Page is currently under construction!</h2>
        </div>
    </div>
</div>

@endsection