<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Publication extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id', 'title', 'slug', 'description',
        'file_path', 'cover_image', 'author', 'published_date', 'is_published',
    ];

    protected $casts = [
        'is_published'   => 'boolean',
        'published_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($pub) {
            if (empty($pub->slug)) {
                $pub->slug = Str::slug($pub->title);
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
