<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContractsApiController;
use App\Http\Controllers\FilesApiController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/contract', [ContractsApiController::class, 'index']);
Route::get('/contract/{id}', [ContractsApiController::class, 'findOne']);
Route::post('/contract', [ContractsApiController::class, 'register']);
Route::put('/contract/{id}', [ContractsApiController::class, 'edit']);
Route::delete('/contract/{id}', [ContractsApiController::class, 'delete']);
Route::get('/list', [ContractsApiController::class, 'list']); //ERRO

Route::post('/files/upload', [FilesApiController::class, 'uploadFile']);
Route::get('/files/download/{id}', 'FilesApiController@download');
Route::get('/files/view/{id}', 'FilesApiController@view');

