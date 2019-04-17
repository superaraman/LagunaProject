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

Auth::routes();

/**
 * Home page
 */
Route::get('/', 'PageController@index')->name('home');
Route::get('/home', function () {
    return redirect()->route('home');
});

/**
 * Pages Routes
 */
Route::get('/about/laguna', 'PageController@laguna')->name('about.laguna');
Route::get('/about/lake-uses', 'PageController@lakeUses')->name('about.lake-uses');
Route::get('/water', 'PageController@water');

/**
 * Admin Web Routes
 */
Route::get('/admin', 'AdminController@index')->name('admin');
Route::get('/admin/graphs/getData', 'AdminController@getGraphsData');
Route::get('/admin/settings', 'AdminController@settings');
Route::get('/admin/users/edit/{id}', 'AdminController@editPage')->name('edit_page');
Route::post('/admin/users/update', 'AdminController@updateUser');
Route::post('/admin/users/reject', 'AdminController@rejectPendingUsers');
Route::post('/admin/users/accept', 'AdminController@acceptPendingUsers');

Route::group(['middleware' => 'App\Http\Middleware\SuperAdmin'], function() {
    Route::get('/admin/table/getPendingUsers', 'AdminController@tablePendingUsers');
    Route::get('/admin/table/getVerifiedUsers', 'AdminController@tableVerifiedUsers');
    Route::get('/admin/users/pendings', 'AdminController@pendingUsers');
    Route::get('/admin/users/verified', 'AdminController@verifiedUsers');
});

Route::fallback(function() {
    return redirect()->route('/home');
});