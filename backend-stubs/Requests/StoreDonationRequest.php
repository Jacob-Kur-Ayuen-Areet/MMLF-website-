<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDonationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'donor_name'    => ['required', 'string', 'max:120'],
            'donor_email'   => ['required', 'email', 'max:200'],
            'donor_phone'   => ['nullable', 'string', 'max:30'],
            'donor_country' => ['nullable', 'string', 'max:100'],
            'amount'        => ['required', 'numeric', 'min:1', 'max:999999'],
            'currency'      => ['nullable', 'string', 'size:3'],
            'purpose'       => ['nullable', 'string', 'max:200'],
            'message'       => ['nullable', 'string', 'max:1000'],
            'is_anonymous'  => ['nullable', 'boolean'],
        ];
    }
}
