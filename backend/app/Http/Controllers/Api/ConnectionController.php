<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Connection;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConnectionController extends Controller
{
    use ApiResponse;

    public function send(Request $request, int $user_id): JsonResponse
    {
        $receiver = User::where('status', 'active')->findOrFail($user_id);

        if ($receiver->id === $request->user()->id) {
            return $this->error('You cannot send a connection request to yourself.', [], 422);
        }

        $existingReverse = Connection::where('sender_id', $receiver->id)
            ->where('receiver_id', $request->user()->id)
            ->first();

        if ($existingReverse) {
            return $this->error('A connection request already exists between these users.', $existingReverse, 409);
        }

        $connection = Connection::updateOrCreate(
            ['sender_id' => $request->user()->id, 'receiver_id' => $receiver->id],
            ['status' => 'pending']
        );

        return $this->success('Connection request sent successfully.', $connection, 201);
    }

    public function accept(Request $request, Connection $connection): JsonResponse
    {
        if ($connection->receiver_id !== $request->user()->id) {
            return $this->error('You can only accept requests sent to you.', [], 403);
        }

        $connection->update(['status' => 'accepted']);

        return $this->success('Connection request accepted successfully.', $connection);
    }

    public function reject(Request $request, Connection $connection): JsonResponse
    {
        if ($connection->receiver_id !== $request->user()->id) {
            return $this->error('You can only reject requests sent to you.', [], 403);
        }

        $connection->update(['status' => 'rejected']);

        return $this->success('Connection request rejected successfully.', $connection);
    }
}
