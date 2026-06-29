<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'reference', 'donor_name', 'donor_email', 'donor_phone', 'donor_country',
        'amount', 'currency', 'purpose', 'message', 'payment_method',
        'payment_status', 'transaction_id', 'payment_meta', 'is_anonymous',
    ];

    protected $casts = [
        'amount'       => 'decimal:2',
        'payment_meta' => 'array',
        'is_anonymous' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($donation) {
            if (empty($donation->reference)) {
                $donation->reference = 'MMLF-' . strtoupper(uniqid());
            }
        });
    }
}
