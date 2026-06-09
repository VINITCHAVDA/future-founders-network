<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChapterController;
use App\Http\Controllers\Api\ConnectionController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\MembershipController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/chapters', [ChapterController::class, 'index']);
Route::get('/events', [EventController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/chapters/{id}/join', [ChapterController::class, 'join']);
    Route::post('/events/{id}/register', [EventController::class, 'register']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    Route::post('/connections/send/{user_id}', [ConnectionController::class, 'send']);
    Route::post('/connections/accept/{connection}', [ConnectionController::class, 'accept']);
    Route::post('/connections/reject/{connection}', [ConnectionController::class, 'reject']);
    Route::post('/membership/apply', [MembershipController::class, 'apply']);

    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::put('/users/{user}/status', [AdminController::class, 'updateUserStatus']);
        Route::post('/chapters', [ChapterController::class, 'store']);
        Route::put('/chapters/{chapter}', [ChapterController::class, 'update']);
        Route::delete('/chapters/{chapter}', [ChapterController::class, 'destroy']);
        Route::post('/events', [EventController::class, 'store']);
        Route::put('/events/{event}', [EventController::class, 'update']);
        Route::delete('/events/{event}', [EventController::class, 'destroy']);
        Route::put('/posts/{post}/approve', [PostController::class, 'approve']);
        Route::put('/posts/{post}/reject', [PostController::class, 'reject']);
        Route::put('/memberships/{membership}/approve', [MembershipController::class, 'approve']);
        Route::put('/memberships/{membership}/reject', [MembershipController::class, 'reject']);
    });
});
