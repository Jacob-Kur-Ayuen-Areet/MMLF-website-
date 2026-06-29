<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramImage extends Model
{
    protected $fillable = ['program_id', 'image_path', 'caption', 'order'];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
