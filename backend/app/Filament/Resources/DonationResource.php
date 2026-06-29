<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DonationResource\Pages;
use App\Models\Donation;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use pxlrbt\FilamentExcel\Actions\Tables\ExportBulkAction;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;
    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';
    protected static ?string $navigationGroup = 'Operations';

    public static function canViewAny(): bool
    {
        return auth()->user()->isSuperAdmin();
    }
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            \Filament\Forms\Components\TextInput::make('reference'),
            \Filament\Forms\Components\TextInput::make('donor_name'),
            \Filament\Forms\Components\TextInput::make('donor_email'),
            \Filament\Forms\Components\TextInput::make('amount'),
            \Filament\Forms\Components\TextInput::make('currency'),
            \Filament\Forms\Components\Select::make('payment_status')
                ->options([
                    'pending' => 'Pending',
                    'completed' => 'Completed',
                    'failed' => 'Failed',
                    'refunded' => 'Refunded',
                ])
                ->required(),
            \Filament\Forms\Components\Textarea::make('message'),
        ]);
    }

    public static function infolist(\Filament\Infolists\Infolist $infolist): \Filament\Infolists\Infolist
    {
        return $infolist
            ->schema([
                \Filament\Infolists\Components\Section::make('Donation Information')
                    ->schema([
                        \Filament\Infolists\Components\TextEntry::make('reference')->copyable(),
                        \Filament\Infolists\Components\TextEntry::make('donor_name')
                            ->state(fn ($record) => $record->is_anonymous ? 'Anonymous' : $record->donor_name),
                        \Filament\Infolists\Components\TextEntry::make('donor_email'),
                        \Filament\Infolists\Components\TextEntry::make('amount')
                            ->money(fn ($record) => $record->currency ?? 'USD'),
                        \Filament\Infolists\Components\TextEntry::make('purpose')->badge(),
                        \Filament\Infolists\Components\TextEntry::make('payment_status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'completed' => 'success',
                                'failed' => 'danger',
                                default => 'gray',
                            }),
                        \Filament\Infolists\Components\TextEntry::make('payment_method'),
                        \Filament\Infolists\Components\TextEntry::make('message')->columnSpanFull(),
                        \Filament\Infolists\Components\TextEntry::make('created_at')->dateTime(),
                    ])->columns(2)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('reference')->searchable()->copyable(),
                Tables\Columns\TextColumn::make('donor_name')->searchable()
                    ->formatStateUsing(fn ($state, $record) => $record->is_anonymous ? 'Anonymous' : $state),
                Tables\Columns\TextColumn::make('donor_email')->searchable()->toggleable(),
                Tables\Columns\TextColumn::make('amount')->money(fn ($record) => $record->currency)->sortable(),
                Tables\Columns\TextColumn::make('purpose')->badge(),
                Tables\Columns\SelectColumn::make('payment_status')
                    ->options([
                        'pending' => 'Pending',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                        'refunded' => 'Refunded',
                    ])
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('payment_status')
                    ->options(['pending' => 'Pending', 'completed' => 'Completed', 'failed' => 'Failed', 'refunded' => 'Refunded']),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDonations::route('/'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
