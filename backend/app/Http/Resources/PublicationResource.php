<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'slug'           => $this->slug,
            'description'    => $this->description,
            'file_url'       => $this->file_path ? asset('storage/' . $this->file_path) : null,
            'cover_image'    => $this->cover_image ? asset('storage/' . $this->cover_image) : null,
            'author'         => $this->author,
            'published_date' => $this->published_date?->toDateString(),
            'category'       => $this->whenLoaded('category', fn() => [
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ]),
        ];
    }
}
