<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'slug'           => $this->slug,
            'summary'        => $this->summary,
            'description'    => $this->description,
            'featured_image' => $this->featured_image ? asset('storage/' . $this->featured_image) : null,
            'icon'           => $this->icon,
            'details'        => $this->details,
            'is_featured'    => $this->is_featured,
            'order'          => $this->order,
            'images'         => ProgramImageResource::collection($this->whenLoaded('images')),
            'created_at'     => $this->created_at?->toIso8601String(),
        ];
    }
}
