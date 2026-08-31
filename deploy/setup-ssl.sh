#!/bin/bash
set -e

# Run this on the host server as root
DOMAIN="wahatalteb.net"
WWW_DOMAIN="www.wahatalteb.net"
EMAIL="admin@wahatalteb.com"

# 1. Install nginx and certbot if missing
if ! command -v nginx >/dev/null 2>&1; then
    dnf install -y nginx || yum install -y nginx || apt-get update && apt-get install -y nginx
fi

if ! command -v certbot >/dev/null 2>&1; then
    dnf install -y certbot python3-certbot-nginx \
        || yum install -y certbot python3-certbot-nginx \
        || apt-get install -y certbot python3-certbot-nginx
fi

# 2. Copy initial nginx config
mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
cp "$(dirname "$0")/nginx.conf" /etc/nginx/sites-available/wahatalteb.conf
ln -sf /etc/nginx/sites-available/wahatalteb.conf /etc/nginx/sites-enabled/wahatalteb.conf

# Remove default server block if it exists to avoid conflicts
rm -f /etc/nginx/sites-enabled/default

# 3. Make sure the frontend container is reachable only from localhost
# (this script assumes docker-compose.yml binds frontend to 127.0.0.1:3000)

nginx -t
systemctl enable nginx --now
systemctl restart nginx

# 4. Obtain/renew SSL certificate using certbot nginx plugin
certbot --nginx -d "$DOMAIN" -d "$WWW_DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect

# 5. Reload nginx to apply SSL config
systemctl reload nginx

echo "SSL setup complete. https://$DOMAIN should now work."
