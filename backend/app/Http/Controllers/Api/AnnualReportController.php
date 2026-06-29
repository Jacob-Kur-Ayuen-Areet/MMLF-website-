<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnualReportResource;
use App\Models\AnnualReport;
use Illuminate\Http\Request;

class AnnualReportController extends Controller
{
    public function index(Request $request)
    {
        $reports = AnnualReport::query()
            ->where('is_published', true)
            ->orderByDesc('report_year')
            ->paginate($request->get('per_page', 10));

        return AnnualReportResource::collection($reports);
    }

    public function show(AnnualReport $report)
    {
        abort_unless($report->is_published, 404);
        return new AnnualReportResource($report);
    }
}
