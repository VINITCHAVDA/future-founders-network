<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'city', 'description', 'status'];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function chapterMembers(): HasMany
    {
        return $this->hasMany(ChapterMember::class);
    }
}
