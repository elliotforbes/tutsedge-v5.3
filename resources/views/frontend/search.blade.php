@extends('layouts.app')

@section('title')
Search the Site
@endsection

@section('meta')
<meta name="description" content="Search the site for high quality programming tutorials...">

@endsection


@section('content')
<div ng-app="TutorialApp">
    <div id="search" ng-controller="SearchController">
        <div class="gray-container search">
            <div class="content">
                <h1>Search:</h1>
                <div class="input-field">
                    <input ng-model="query" placeholder="Search Here..." ng-change="search" type="text" class="validate">
                </div>
            </div>
        </div> 

        <div class="container">
            <div class="course-container row">
                <div id="search">
                    <h2>Results For: @{{ query }}</h2>
                    <div class="row flexbox-courses">
                        <div ng-repeat="lesson in lessons | filter:query" class="col l4 m4 s12 course-container">
                            <div class="course-box">
                                <div class="course-image"> 
                                    <img src="{{ url('/uploads/') }}/@{{ lesson.image_path }}">
                                </div>
                                <div class="course-content">
                                <h5 class="course-title">@{{ lesson.title }}</h5>
                                <p>@{{ lesson.description }}</p>
                                </div>
                                <div class="course-action">
                                <a href="{{ url('/') }}/@{{ lesson.slug }}">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- .search -->
            </div><!-- .course-container .row -->
            
                
            
        </div><!-- .container -->
    </div>
</div>
<script src="{{ asset('/js/search.controller.js?v=15', Request::secure()) }}"></script>

@endsection