<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\ChapterMember;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ChapterController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $chapters = Chapter::withCount(['events', 'chapterMembers'])->where('status', 'active')->latest()->get();

        return $this->success('Chapters fetched successfully.', $chapters);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', Rule::in(['active', 'inactive'])],
        ]);

        $chapter = Chapter::create($validated);

        return $this->success('Chapter created successfully.', $chapter, 201);
    }

    public function update(Request $request, Chapter $chapter): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'city' => ['sometimes', 'required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', Rule::in(['active', 'inactive'])],
        ]);

        $chapter->update($validated);

        return $this->success('Chapter updated successfully.', $chapter);
    }

    public function destroy(Chapter $chapter): JsonResponse
    {
        $chapter->delete();

        return $this->success('Chapter deleted successfully.');
    }

    public function join(Request $request, int $id): JsonResponse
    {
        $chapter = Chapter::where('status', 'active')->findOrFail($id);

        $member = ChapterMember::updateOrCreate(
            ['user_id' => $request->user()->id, 'chapter_id' => $chapter->id],
            ['status' => 'pending']
        );

        return $this->success('Chapter join request submitted successfully.', $member, 201);
    }
}
