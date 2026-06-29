<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnualReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'report_year' => $this->report_year,
            'description' => $this->description,
            'file_url'    => asset('storage/' . $this->file_path),
            'cover_image' => $this->cover_image ? asset('storage/' . $this->cover_image) : null,
            'created_at'  => $this->created_at?->toIso8601String(),
        ];
    }
}
