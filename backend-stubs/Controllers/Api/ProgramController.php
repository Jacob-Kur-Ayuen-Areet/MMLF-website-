<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $programs = Program::query()
            ->where('is_active', true)
            ->when($request->featured, fn($q) => $q->where('is_featured', true))
            ->orderBy('order')
            ->with('images')
            ->paginate($request->get('per_page', 12));

        return ProgramResource::collection($programs);
    }

    public function show(string $slug)
    {
        $program = Program::where('slug', $slug)
            ->where('is_active', true)
            ->with('images')
            ->firstOrFail();

        return new ProgramResource($program);
    }
}
