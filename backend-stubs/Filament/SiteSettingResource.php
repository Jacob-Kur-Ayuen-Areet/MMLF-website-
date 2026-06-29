<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationGroup = 'Administration';
    protected static ?string $navigationLabel = 'Site Settings';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('key')->required()->disabled(fn (string $operation) => $operation === 'edit'),
            Forms\Components\TextInput::make('label')->required(),
            Forms\Components\Select::make('type')
                ->options(['text' => 'Text', 'json' => 'JSON', 'boolean' => 'Boolean', 'image' => 'Image'])
                ->required()->live(),
            Forms\Components\Select::make('group')
                ->options(['general' => 'General', 'contact' => 'Contact', 'social' => 'Social Media', 'impact' => 'Impact Stats', 'seo' => 'SEO']),
            Forms\Components\Textarea::make('value')
                ->visible(fn (Forms\Get $get) => in_array($get('type'), ['text', 'json']))
                ->rows(4)->columnSpanFull(),
            Forms\Components\Toggle::make('value')
                ->visible(fn (Forms\Get $get) => $get('type') === 'boolean'),
            Forms\Components\FileUpload::make('value')
                ->image()->directory('settings')
                ->visible(fn (Forms\Get $get) => $get('type') === 'image')
                ->columnSpanFull(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('label')->searchable(),
                Tables\Columns\TextColumn::make('key')->searchable()->badge(),
                Tables\Columns\TextColumn::make('group')->badge(),
                Tables\Columns\TextColumn::make('value')->limit(60)->wrap(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('group')
                    ->options(['general' => 'General', 'contact' => 'Contact', 'social' => 'Social', 'impact' => 'Impact', 'seo' => 'SEO']),
            ])
            ->actions([Tables\Actions\EditAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListSiteSettings::route('/'),
            'create' => Pages\CreateSiteSetting::route('/create'),
            'edit'   => Pages\EditSiteSetting::route('/{record}/edit'),
        ];
    }
}
