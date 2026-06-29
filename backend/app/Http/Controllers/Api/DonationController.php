<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonationRequest;
use App\Models\Donation;
use Illuminate\Http\JsonResponse;

class DonationController extends Controller
{
    public function store(StoreDonationRequest $request): JsonResponse
    {
        $donation = Donation::create($request->validated());

        return response()->json([
            'message'   => 'Thank you for your generous donation!',
            'reference' => $donation->reference,
            'amount'    => $donation->amount,
            'currency'  => $donation->currency,
        ], 201);
    }
}
