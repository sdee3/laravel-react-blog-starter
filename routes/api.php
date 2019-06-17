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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/articles', 'ArticleController@fetch');
Route::get('/article/{slug}', 'ArticleController@fetch');
Route::post('/article', 'ArticleController@submit');
Route::put('/article/{slug}', 'ArticleController@update');
Route::delete('/article/{slug}', 'ArticleController@delete');

Route::get('/categories', 'CategoryController@fetch');
Route::get('/categories/{id}', 'CategoryController@fetch');
Route::post('/categories', 'CategoryController@store');
Route::put('/categories', 'CategoryController@update');
Route::delete('/categories/{id}', 'CategoryController@delete');

Route::post('/admin-login', 'BlogController@handleAdminLogin');
Route::post('/validate-cookie', 'BlogController@validateCookie');

Route::post('/contact', 'EmailController@submitContactForm');
Route::post('/upload', 'BlogController@upload');
