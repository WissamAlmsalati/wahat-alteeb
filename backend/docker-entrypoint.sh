#!/bin/sh
set -e

# Create .env from example if missing
if [ ! -f /var/www/html/.env ]; then
    cp /var/www/html/.env.example /var/www/html/.env
fi

# Generate app key if missing
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
    php artisan key:generate --force
fi

# Wait for MySQL to be ready when using mysql driver
if [ "$DB_CONNECTION" = "mysql" ]; then
    echo "Waiting for MySQL at ${DB_HOST}:${DB_PORT}..."
    while ! nc -z "$DB_HOST" "$DB_PORT"; do
        sleep 1
    done
    echo "MySQL is ready."
fi

# Clear any config cache from the image build so runtime env vars are used
php artisan config:clear

# Set permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Run migrations
php artisan migrate --force

# Create storage link
php artisan storage:link

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
exec apache2-foreground
