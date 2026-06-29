<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/setup-admin', function () {
    $user = \App\Models\User::firstOrCreate(
        ['email' => 'admin@mmlf.org'],
        [
            'name' => 'MMLF Admin',
            'password' => \Illuminate\Support\Facades\Hash::make('MMLF-Admin-2026!')
        ]
    );

    return "Admin user successfully created! Email: admin@mmlf.org | Password: MMLF-Admin-2026!";
});
