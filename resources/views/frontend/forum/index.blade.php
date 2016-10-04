@extends('layouts.app')

@section('title')
The Forum
@endsection

@section('meta')
<meta name="description" content="Forum Homepage">
@endsection

@section('content')
<div class="content">
    <h2>Forum Home</h2>
    <p>Got any questions or suggestions for the site? Post them hear and let me know what I can do to improve the site!</p>
</div>
<div class="gray-container">
    <div class="content">
        <div class="row">
        <div class="col s12 m12 l12">
            <div class="card-panel white">
            <div class="icon valign-wrapper">
                <i class="material-icons">comments</i>
            </div>
            <h5>
                Forum Post Title
                <br/>
                <small>Author: Elliot Forbes</small>    
            </h5>
            
            <span>
                This is currently under construction. Stay tuned for updates!
            </span>
            </div>
        </div>
        </div>
    </div>
</div>
@endsection