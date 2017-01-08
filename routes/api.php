<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/*
 * Lesson Routes
 */
Route::group(['middleware' =>  ['auth:api']], function() {

  Route::get('lessons','API\LessonAPIController@index');
  Route::post('lessons', 'API\LessonAPIController@search');
  Route::get('lesson/{slug}', 'API\LessonAPIController@show');
  Route::get('lessons/all', 'API\LessonAPIController@all');

  /*
  * Blog Post Routes
  */
  Route::get('posts', 'API\PostAPIController@index');
  Route::post('posts', 'API\PostAPIController@search');
  Route::get('posts/{slug}', 'API\PostAPIController@show');
  Route::get('posts/all', 'API\PostAPIController@all');

  /*
  * User Routes
  */
  Route::get('users', 'API\UserAPIController@index');
  Route::get('users/all', 'API\UserAPIController@all');
  Route::get('user/{id}', 'API\UserAPIController@show');
  Route::get('users/growth', 'API\UserAPIController@growthStats');

  /* 
  * Course Routes
  */
  Route::get('courses', 'API\CourseAPIController@index');
  Route::get('course/{slug}', 'API\CourseAPIController@show');
  Route::post('courses', 'API\CourseAPIController@search');
  Route::get('courses/all', 'API\CourseAPIController@all');

  /*
  * Tag Routes
  */
  Route::get('tags', 'API\TagAPIController@index');
  Route::get('tag/{id}', 'API\TagAPIController@show');

  Route::get('test', 'EmailController@test');

});

