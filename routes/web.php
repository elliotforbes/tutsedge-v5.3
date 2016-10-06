<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'FrontendController@Home');
Route::get('/tutorials', 'FrontendController@allTutorials');
Route::get('/search', 'FrontendController@search');
Route::get('/about', 'FrontendController@about');
Route::get('/contact', 'FrontendController@contact');
Route::get('/blog', 'FrontendController@blog');
Route::get('/courses', 'FrontendController@courses');
Route::get('/blog/{slug}', 'FrontendController@blogSingle');
Route::get('/advertise', 'FrontendController@advertise');
Route::get('/sitemap', 'FrontendController@sitemap');
Route::get('/profile', 'FrontendController@profile');
Route::get('/forum', 'FrontendController@forum');
Route::get('/register', 'FrontendController@register');
/*
 * Book Review Routes:
 */ 
Route::get('/books', 'BookController@index');
Route::get('/book/{slug}', 'BookController@single');
/*
 * Error Routes.
 */
Route::get('/404', 'FrontendController@error404');
Route::get('/500', 'FrontendController@error500');
Route::get('/error', 'FrontendController@error');

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function (){
    Route::get('/', 'Admin\AdminController@Home');     
});

// Tags, Courses and Single Lessons
Route::get('/tag/{slug}', 'FrontendController@tag');
Route::get('/course/{slug}', 'FrontendController@course');
Route::get('/{slug}', 'FrontendController@show');

Route::resource('comments', 'CommentController');

Route::get('/testemail', 'EmailController@test');

Route::group(['prefix' => 'api/v1'], function (){
    Route::resource('lessons', 'LessonsController', ['only' => ['index', 'show']]);    
});

/*
* Our github authentication routes 
*/
Route::get('/auth/github', 'Auth\AuthController@redirectToProvider');
Route::get('/auth/github/callback', 'Auth\AuthController@handleProviderCallback');
/*
* Our facebook authentication routes 
*/
Route::get('/auth/redirect', 'Auth\SocialAuthController@redirect');
Route::get('/auth/callback', 'Auth\SocialAuthController@callback');

Auth::routes();