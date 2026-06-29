<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnnualReport extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'report_year', 'description', 'file_path', 'cover_image', 'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
