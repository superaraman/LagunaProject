<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/admin', 'AdminController@index');

Route::get('/admin/users/pendings', 'AdminController@pendingUsers');
Route::get('/admin/users/verified', 'AdminController@verifiedUsers');
Route::get('/admin/users/getPending', 'AdminController@getPendingUsers');
Route::get('/admin/users/getVerified', 'AdminController@getVerifiedUsers');
Route::post('/admin/users/accept', 'AdminController@acceptPendingUsers');
Route::post('/admin/users/reject', 'AdminController@rejectPendingUsers');

Route::get('/admin/settings', 'AdminController@settings');