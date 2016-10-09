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

Route::get('lessons','API\LessonAPIController@index');
Route::get('lesson/{slug}', 'API\LessonAPIController@show');

Route::get('users', 'API\UserAPIController@index');
Route::get('user/{id}', 'API\UserAPIController@show');