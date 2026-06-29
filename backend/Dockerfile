FROM php:8.2-apache

# Install system dependencies and PHP extensions required by Laravel and Filament
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Enable Apache mod_rewrite (required for Laravel routing)
RUN a2enmod rewrite

# Install Composer securely
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy the entire backend application
COPY . /var/www/html

# Change Apache document root to the Laravel /public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Set permissions for Laravel to be able to write to storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Install PHP dependencies for production without running scripts
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Expose the standard web port
EXPOSE 80

# At startup, run composer scripts, migrate the database, and start Apache
CMD php artisan package:discover && php artisan filament:upgrade && php artisan config:cache && php artisan route:cache && php artisan migrate --force && apache2-foreground
