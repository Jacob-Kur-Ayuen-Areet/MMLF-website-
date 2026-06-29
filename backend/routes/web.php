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

    $superAdminRole = \App\Models\Role::firstOrCreate(
        ['name' => 'super_admin'],
        ['display_name' => 'Super Admin', 'description' => 'Full system access']
    );

    if (!$user->roles()->where('name', 'super_admin')->exists()) {
        $user->roles()->attach($superAdminRole->id);
    }

    return "Super Admin user successfully created! Email: admin@mmlf.org | Password: MMLF-Admin-2026!";
});
