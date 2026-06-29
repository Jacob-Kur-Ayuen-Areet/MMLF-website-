<?php

namespace App\Filament\Widgets;

use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\News;
use App\Models\Program;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $totalDonations = Donation::where('payment_status', 'completed')->sum('amount');
        $newMessages = ContactMessage::where('status', 'unread')->count();

        return [
            Stat::make('Total Donations (USD)', '$' . number_format($totalDonations, 2))
                ->description('Completed donations')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('success'),

            Stat::make('Active Programs', Program::where('is_active', true)->count())
                ->description('Running programs')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('primary'),

            Stat::make('Published News', News::where('is_published', true)->count())
                ->description('Live articles')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('info'),

            Stat::make('Unread Messages', $newMessages)
                ->description('Contact messages awaiting reply')
                ->descriptionIcon('heroicon-m-envelope')
                ->color($newMessages > 0 ? 'warning' : 'success'),
        ];
    }
}
