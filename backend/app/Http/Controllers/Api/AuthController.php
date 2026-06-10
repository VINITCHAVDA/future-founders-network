<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Throwable;

class AuthController extends Controller
{
    use ApiResponse;

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['sometimes', Rule::in(['user'])],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'user',
            'status' => 'active',
        ]);

        Profile::create(['user_id' => $user->id]);
        $token = $user->createToken('student-api-token')->plainTextToken;

        return $this->success('Registration successful.', ['user' => $user->load('profile'), 'token' => $token], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return $this->error('Invalid login credentials.', [], 401);
        }

        if ($user->status !== 'active') {
            return $this->error('Your account is inactive. Please contact support.', [], 403);
        }

        $token = $user->createToken($user->role.'-api-token')->plainTextToken;

        return $this->success('Login successful.', ['user' => $user->load('profile'), 'token' => $token]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        try {
            $status = Password::sendResetLink([
                'email' => $validated['email'],
            ]);
        } catch (Throwable $exception) {
            Log::error('Password reset email failed to send.', [
                'email' => $validated['email'],
                'error' => $exception->getMessage(),
            ]);

            return $this->error('Password reset email could not be sent. Please verify the Gmail SMTP settings and try again.', [
                'email' => ['Password reset email could not be sent. Check storage/logs/laravel.log for SMTP details.'],
            ], 500);
        }

        Log::info('Password reset link request completed.', [
            'email' => $validated['email'],
            'status' => $status,
        ]);

        if ($status === Password::RESET_LINK_SENT) {
            return $this->success('Password reset link sent. Please check your email.');
        }

        if ($status === Password::INVALID_USER) {
            return $this->error('No account was found for that email address.', [
                'email' => [__($status)],
            ], 422);
        }

        return $this->error('Unable to send password reset link.', [
            'email' => [__($status)],
        ], 422);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $status = Password::reset(
            $validated,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return $this->success('Password reset successful. You can now login with your new password.');
        }

        return $this->error('Unable to reset password. Please verify your email and reset token.', [
            'email' => [__($status)],
        ], 422);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success('Logout successful.');
    }
}
