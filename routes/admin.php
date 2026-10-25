<?php

use Illuminate\Support\Facades\Route;
use Hunterrock\ServerCategories\ServerCategoriesController;

Route::post('/categories', [ServerCategoriesController::class, 'saveCategories']);
Route::post('/assignments', [ServerCategoriesController::class, 'saveAssignments']);
Route::post('/reset', [ServerCategoriesController::class, 'reset']);
