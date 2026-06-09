<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    use ApiResponse;

    public function apply(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'plan_name' => ['required', 'string', 'max:255'],
        ]);

        $membership = Membership::create($validated + ['user_id' => $request->user()->id, 'status' => 'pending']);

        return $this->success('Membership application submitted successfully.', $membership, 201);
    }

    public function approve(Membership $membership): JsonResponse
    {
        $membership->update(['status' => 'approved']);

        return $this->success('Membership approved successfully.', $membership->load('user:id,name,email'));
    }

    public function reject(Membership $membership): JsonResponse
    {
        $membership->update(['status' => 'rejected']);

        return $this->success('Membership rejected successfully.', $membership->load('user:id,name,email'));
    }
}
