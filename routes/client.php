<?php

use Illuminate\Support\Facades\Route;
use Hunterrock\ServerCategories\ServerCategoriesController;

Route::get('/data', [ServerCategoriesController::class, 'getData']);
