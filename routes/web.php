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

Route::prefix('/api')->group(function(){
    Route::post('/login', 'UsersController@login');
    Route::post('/loginqr', 'UsersController@loginQRCode');
    Route::prefix('/users')->middleware('checklogin')->group(function () {
        Route::get('/', 'UsersController@show');
        Route::patch('/', 'UsersController@update');
    });
    Route::prefix('/stores')->middleware('checklogin')->group(function () {
        Route::get('/', 'StoresController@index');
        Route::get('/trades', 'StoresController@trades');
        Route::post('/{store}/trades', 'StoresController@storeTrades');
    });
    Route::prefix('/logs')->middleware('checklogin')->group(function () {
        Route::get('/', 'LogsController@index');
    });
});

Route::prefix('/admin')->middleware(['checklogin', 'checkadmin'])->group(function () {
    require_once 'admin/web.php';
});
Route::view('/{query}', 'index')->where('query', '.*');