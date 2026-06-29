<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicationResource;
use App\Models\Publication;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    public function index(Request $request)
    {
        $publications = Publication::query()
            ->where('is_published', true)
            ->with('category')
            ->when($request->category, fn($q) => $q->whereHas('category', fn($c) => $c->where('slug', $request->category)))
            ->orderByDesc('published_date')
            ->paginate($request->get('per_page', 10));

        return PublicationResource::collection($publications);
    }

    public function show(string $slug)
    {
        $publication = Publication::where('slug', $slug)
            ->where('is_published', true)
            ->with('category')
            ->firstOrFail();

        return new PublicationResource($publication);
    }
}
