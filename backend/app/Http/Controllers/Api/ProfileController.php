<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    use ApiResponse;

    public function show(Request $request): JsonResponse
    {
        return $this->success('Profile fetched successfully.', $request->user()->load('profile'));
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'phone' => ['nullable', 'string', 'max:30'],
            'city' => ['nullable', 'string', 'max:150'],
            'college' => ['nullable', 'string', 'max:255'],
            'course' => ['nullable', 'string', 'max:255'],
            'skills' => ['nullable', 'string'],
            'bio' => ['nullable', 'string'],
            'linkedin' => ['nullable', 'url', 'max:255'],
            'github' => ['nullable', 'url', 'max:255'],
            'photo' => ['nullable', 'string', 'max:255'],
        ]);

        $profile = $request->user()->profile()->updateOrCreate(['user_id' => $request->user()->id], $validated);

        return $this->success('Profile updated successfully.', $profile);
    }
}
