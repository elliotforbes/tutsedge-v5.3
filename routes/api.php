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
Route::get('lessons','API\LessonAPIController@index');
Route::get('lesson/{slug}', 'API\LessonAPIController@show');
Route::get('lessons/all', 'API\LessonAPIController@all');

/*
 * User Routes
 */
Route::get('users', 'API\UserAPIController@index');
Route::get('user/{id}', 'API\UserAPIController@show');
Route::get('users/growth', 'API\UserAPIController@growthStats');

/* 
 * Course Routes
 */
Route::get('courses', 'API\CourseAPIController@index');
Route::get('course/{id}', 'API\CourseAPIController@show');

/*
 * Tag Routes
 */
Route::get('tags', 'API\TagAPIController@index');
Route::get('tag/{id}', 'API\TagAPIController@show');





