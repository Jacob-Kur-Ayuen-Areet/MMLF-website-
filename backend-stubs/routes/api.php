<?php

use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\PublicationController;
use App\Http\Controllers\Api\AnnualReportController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SiteSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Public API endpoints
    Route::get('/settings', [SiteSettingController::class, 'index']);

    Route::apiResource('programs', ProgramController::class)->only(['index', 'show']);
    Route::apiResource('news', NewsController::class)->only(['index', 'show']);
    Route::apiResource('publications', PublicationController::class)->only(['index', 'show']);
    Route::apiResource('reports', AnnualReportController::class)->only(['index', 'show']);
    Route::get('/pages/{slug}', [PageController::class, 'show']);

    // Rate-limited endpoints
    Route::middleware('throttle:donations')->group(function () {
        Route::post('/donations', [DonationController::class, 'store']);
    });

    Route::middleware('throttle:contacts')->group(function () {
        Route::post('/contact', [ContactController::class, 'store']);
    });
});
