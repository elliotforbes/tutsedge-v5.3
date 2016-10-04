@extends('layouts.app')

@section('content')
<div class="gray-container">
    <div class="content">
        <h1>Your Profile: {{ $user->name }}</h1>
    </div>
</div>

<div class="content">
    <div class="container">
        <div class="row">
            
            <div class="col s6">
                <p><b>Date Joined:</b> {{ $user->created_at }}</p>
            </div>
            
            <div class="col s6">
                <p><b>Email:</b> {{ $user->email }}</p>
            </div>
            
        </div>
    </div>
</div>

@endsection