<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Program extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'summary', 'description', 'featured_image',
        'icon', 'details', 'is_featured', 'is_active', 'order',
    ];

    protected $casts = [
        'details'     => 'array',
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($program) {
            if (empty($program->slug)) {
                $program->slug = Str::slug($program->title);
            }
        });
    }

    public function images()
    {
        return $this->hasMany(ProgramImage::class)->orderBy('order');
    }
}
