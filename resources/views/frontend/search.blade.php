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
                
                    <div ng-repeat="lesson in lessons | filter:query" class="result">
                        
                        <div class="lesson col s12 m6 l4">
                            <figure class="snip1253">
                                <div class="image"><img src="{{ asset('/uploads/') }}/default.png" alt="sample52"/></div>
                                <figcaption>
                                    <h3>@{{ lesson.title }}</h3>
                                    <p>
                                        
                                        @{{ lesson.description }}
                                    </p>
                                </figcaption>
                                <footer>
                                    <div class="views"><i class="ion-eye"></i>@{{ lesson.views }}</div>
                                    </footer><a href="{{url('/') }}/@{{ lesson.slug }}"></a>
                            </figure><!-- .snip1253 -->
                        </div><!-- .lesson .col -->
                    </div><!-- .result -->
                </div><!-- .search -->
            </div><!-- .course-container .row -->
            
                
            
        </div><!-- .container -->
    </div>
</div>
<script src="{{ asset('/js/search.controller.js?v=15', Request::secure()) }}"></script>

@endsection