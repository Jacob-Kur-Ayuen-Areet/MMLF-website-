<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsResource;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $news = News::query()
            ->published()
            ->with(['category', 'author'])
            ->when($request->category, fn($q) => $q->whereHas('category', fn($c) => $c->where('slug', $request->category)))
            ->when($request->featured, fn($q) => $q->where('is_featured', true))
            ->when($request->search, fn($q) => $q->where(function ($sub) use ($request) {
                $sub->where('title', 'like', "%{$request->search}%")
                    ->orWhere('excerpt', 'like', "%{$request->search}%");
            }))
            ->orderByDesc('published_at')
            ->paginate($request->get('per_page', 10));

        return NewsResource::collection($news);
    }

    public function show(string $slug)
    {
        $article = News::where('slug', $slug)
            ->published()
            ->with(['category', 'author'])
            ->firstOrFail();

        return new NewsResource($article);
    }
}
