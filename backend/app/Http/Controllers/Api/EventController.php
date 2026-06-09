<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EventController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $events = Event::with(['chapter:id,name,city', 'creator:id,name'])->latest('event_date')->get();

        return $this->success('Events fetched successfully.', $events);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'event_date' => ['required', 'date'],
            'event_time' => ['required', 'date_format:H:i'],
            'location' => ['required', 'string', 'max:255'],
            'chapter_id' => ['required', 'exists:chapters,id'],
            'status' => ['sometimes', Rule::in(['upcoming', 'completed', 'cancelled'])],
        ]);

        $event = Event::create($validated + ['created_by' => $request->user()->id]);

        return $this->success('Event created successfully.', $event->load('chapter'), 201);
    }

    public function update(Request $request, Event $event): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'event_date' => ['sometimes', 'required', 'date'],
            'event_time' => ['sometimes', 'required', 'date_format:H:i'],
            'location' => ['sometimes', 'required', 'string', 'max:255'],
            'chapter_id' => ['sometimes', 'required', 'exists:chapters,id'],
            'status' => ['sometimes', Rule::in(['upcoming', 'completed', 'cancelled'])],
        ]);

        $event->update($validated);

        return $this->success('Event updated successfully.', $event->load('chapter'));
    }

    public function destroy(Event $event): JsonResponse
    {
        $event->delete();

        return $this->success('Event deleted successfully.');
    }

    public function register(Request $request, int $id): JsonResponse
    {
        $event = Event::where('status', 'upcoming')->findOrFail($id);

        $registration = EventRegistration::updateOrCreate(
            ['user_id' => $request->user()->id, 'event_id' => $event->id],
            ['status' => 'registered']
        );

        return $this->success('Event registered successfully.', $registration, 201);
    }
}
