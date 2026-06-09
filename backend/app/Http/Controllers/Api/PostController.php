<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $posts = Post::with('user:id,name')->where('status', 'approved')->latest()->get();

        return $this->success('Posts fetched successfully.', $posts);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
        ]);

        $post = Post::create($validated + ['user_id' => $request->user()->id, 'status' => 'pending']);

        return $this->success('Post created successfully and sent for approval.', $post, 201);
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        if ($post->user_id !== $request->user()->id) {
            return $this->error('You can only update your own posts.', [], 403);
        }

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
        ]);

        $post->update($validated + ['status' => 'pending']);

        return $this->success('Post updated successfully and sent for approval.', $post);
    }

    public function destroy(Request $request, Post $post): JsonResponse
    {
        if ($post->user_id !== $request->user()->id) {
            return $this->error('You can only delete your own posts.', [], 403);
        }

        $post->delete();

        return $this->success('Post deleted successfully.');
    }

    public function approve(Post $post): JsonResponse
    {
        $post->update(['status' => 'approved']);

        return $this->success('Post approved successfully.', $post);
    }

    public function reject(Post $post): JsonResponse
    {
        $post->update(['status' => 'rejected']);

        return $this->success('Post rejected successfully.', $post);
    }
}
