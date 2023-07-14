<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContractsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [ContractsController::class, 'index']);
Route::get('/view/files/{filename}', [ContractsController::class, 'viewPDF']);
Route::get('/download/files/{filename}', [ContractsController::class, 'downloadPDF']);
