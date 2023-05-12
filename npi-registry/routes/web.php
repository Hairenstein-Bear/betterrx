<?php

use App\Http\Controllers\NpiDataController;
use App\Models\NpiData;
use Illuminate\Support\Facades\Route;

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
Route::post('/search', [NpiDataController::class, 'search']);
Route::get('npi', [NpiDataController::class, 'getNpiData']);
Route::get('lookup', function () {
    return view('search');
});