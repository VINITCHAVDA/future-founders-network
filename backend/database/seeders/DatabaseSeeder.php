<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Event;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@futurefounders.test'],
            [
                'name' => 'Future Founders Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'status' => 'active',
            ]
        );

        Profile::updateOrCreate(['user_id' => $admin->id], [
            'city' => 'New York',
            'college' => 'Future Founders Network HQ',
            'course' => 'Administration',
            'skills' => 'Community operations, entrepreneurship, mentoring',
        ]);

        $students = collect([
            ['name' => 'Ava Johnson', 'email' => 'ava@example.test', 'city' => 'New York', 'college' => 'NYU', 'course' => 'Business Analytics'],
            ['name' => 'Liam Chen', 'email' => 'liam@example.test', 'city' => 'San Francisco', 'college' => 'UC Berkeley', 'course' => 'Computer Science'],
            ['name' => 'Mia Patel', 'email' => 'mia@example.test', 'city' => 'Austin', 'college' => 'UT Austin', 'course' => 'Marketing'],
            ['name' => 'Noah Williams', 'email' => 'noah@example.test', 'city' => 'Chicago', 'college' => 'Northwestern', 'course' => 'Finance'],
            ['name' => 'Sophia Garcia', 'email' => 'sophia@example.test', 'city' => 'Boston', 'college' => 'Boston University', 'course' => 'Product Design'],
        ])->map(function (array $student) {
            $user = User::updateOrCreate(
                ['email' => $student['email']],
                [
                    'name' => $student['name'],
                    'password' => Hash::make('password123'),
                    'role' => 'user',
                    'status' => 'active',
                ]
            );

            Profile::updateOrCreate(['user_id' => $user->id], [
                'city' => $student['city'],
                'college' => $student['college'],
                'course' => $student['course'],
                'skills' => 'Pitching, networking, startup strategy',
                'bio' => 'Student founder exploring early-stage venture ideas.',
                'linkedin' => 'https://linkedin.com/in/'.strtolower(str_replace(' ', '-', $student['name'])),
                'github' => 'https://github.com/'.strtolower(strtok($student['name'], ' ')),
            ]);

            return $user;
        });

        $chapters = collect([
            ['name' => 'NYC Student Founders', 'city' => 'New York', 'description' => 'A chapter for student founders building ventures in New York.'],
            ['name' => 'Bay Area Builders', 'city' => 'San Francisco', 'description' => 'Connect with tech-focused student entrepreneurs across the Bay Area.'],
            ['name' => 'Austin Startup Circle', 'city' => 'Austin', 'description' => 'A practical chapter for product launches, pitch nights, and local mentors.'],
            ['name' => 'Boston Venture Lab', 'city' => 'Boston', 'description' => 'A campus-driven network for founders, designers, and operators.'],
        ])->map(fn (array $chapter) => Chapter::updateOrCreate(['name' => $chapter['name']], $chapter + ['status' => 'active']));

        collect([
            ['title' => 'Founder Mixer Night', 'chapter_id' => $chapters[0]->id, 'location' => 'NYU Leslie eLab', 'event_date' => now()->addDays(10)->toDateString(), 'event_time' => '18:00'],
            ['title' => 'Student Pitch Sprint', 'chapter_id' => $chapters[1]->id, 'location' => 'Berkeley SkyDeck', 'event_date' => now()->addDays(17)->toDateString(), 'event_time' => '17:30'],
            ['title' => 'MVP Workshop', 'chapter_id' => $chapters[2]->id, 'location' => 'Capital Factory', 'event_date' => now()->addDays(24)->toDateString(), 'event_time' => '16:00'],
            ['title' => 'Venture Capital 101', 'chapter_id' => $chapters[3]->id, 'location' => 'BUild Lab', 'event_date' => now()->addDays(31)->toDateString(), 'event_time' => '15:30'],
            ['title' => 'Campus Demo Day', 'chapter_id' => $chapters[0]->id, 'location' => 'Civic Hall', 'event_date' => now()->addDays(45)->toDateString(), 'event_time' => '19:00'],
        ])->each(fn (array $event) => Event::updateOrCreate(['title' => $event['title']], $event + [
            'description' => 'A curated Future Founders Network event for learning, networking, and launch support.',
            'created_by' => $admin->id,
            'status' => 'upcoming',
        ]));
    }
}
