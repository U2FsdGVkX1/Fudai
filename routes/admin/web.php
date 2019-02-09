<?php

// DB::listen(function($query) {
//     Log::debug($query->sql);
// });
Route::prefix('/api')->group(function(){
    Route::apiResource('/users', 'Admin\UsersController');

    Route::get('/stores/trades', 'Admin\StoresController@trades');
    Route::delete('/stores/trades', 'Admin\StoresController@clearTrades');
    Route::patch('/stores/trades/{id}', 'Admin\StoresController@updateTrades');
    
    Route::apiResource('/stores', 'Admin\StoresController');
});

Route::view('/', 'admin');
Route::view('/{query}', 'admin')->where('query', '.*');