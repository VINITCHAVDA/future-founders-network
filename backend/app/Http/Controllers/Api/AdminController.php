<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Event;
use App\Models\Membership;
use App\Models\Post;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    use ApiResponse;

    public function dashboard(): JsonResponse
    {
        return $this->success('Admin dashboard fetched successfully.', [
            'total_users' => User::count(),
            'total_chapters' => Chapter::count(),
            'total_events' => Event::count(),
            'total_posts' => Post::count(),
            'pending_memberships' => Membership::where('status', 'pending')->count(),
            'pending_posts' => Post::where('status', 'pending')->count(),
        ]);
    }

    public function users(): JsonResponse
    {
        $users = User::with('profile')->latest()->get();

        return $this->success('Users fetched successfully.', $users);
    }

    public function updateUserStatus(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ]);

        $user->update($validated);

        return $this->success('User status updated successfully.', $user);
    }
}
