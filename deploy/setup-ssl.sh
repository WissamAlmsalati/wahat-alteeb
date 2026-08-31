#!/bin/bash
set -e

# Run this on the host server as root
DOMAIN="wahatalteb.net"
WWW_DOMAIN="www.wahatalteb.net"
EMAIL="admin@wahatalteb.com"

install_nginx() {
    if command -v dnf >/dev/null 2>&1; then
        dnf install -y nginx
    elif command -v yum >/dev/null 2>&1; then
        yum install -y nginx
    elif command -v apt-get >/dev/null 2>&1; then
        apt-get update && apt-get install -y nginx
    else
        echo "No supported package manager found. Install nginx manually." >&2
        exit 1
    fi
    hash -r
}

install_certbot() {
    if command -v dnf >/dev/null 2>&1; then
        dnf install -y epel-release
        dnf install -y certbot python3-certbot-nginx
    elif command -v yum >/dev/null 2>&1; then
        yum install -y epel-release
        yum install -y certbot python3-certbot-nginx
    elif command -v apt-get >/dev/null 2>&1; then
        apt-get update && apt-get install -y certbot python3-certbot-nginx
    else
        echo "No supported package manager found. Install certbot manually." >&2
        exit 1
    fi
    hash -r
}

# 1. Install nginx if missing
if ! command -v nginx >/dev/null 2>&1; then
    install_nginx
fi

# 2. Install certbot if missing
if ! command -v certbot >/dev/null 2>&1; then
    install_certbot
fi

# 3. Copy nginx config to conf.d (works on AlmaLinux/CentOS/Debian)
cp "$(dirname "$0")/nginx.conf" /etc/nginx/conf.d/wahatalteb.conf
rm -f /etc/nginx/conf.d/default.conf

# 4. Test and start nginx
nginx -t
systemctl enable nginx --now
systemctl restart nginx

# 5. Obtain SSL certificate (certbot will modify the config to add HTTPS)
# Only include www if it actually resolves, otherwise certbot fails.
CERTBOT_DOMAINS=("-d" "$DOMAIN")
if getent hosts "$WWW_DOMAIN" >/dev/null 2>&1; then
    CERTBOT_DOMAINS+=("-d" "$WWW_DOMAIN")
fi

certbot --nginx "${CERTBOT_DOMAINS[@]}" --non-interactive --agree-tos -m "$EMAIL" --redirect

# 6. Open HTTPS port if a host firewall is present
if command -v firewall-cmd >/dev/null 2>&1; then
    firewall-cmd --add-service=http --permanent
    firewall-cmd --add-service=https --permanent
    firewall-cmd --reload
elif command -v iptables >/dev/null 2>&1; then
    iptables -I INPUT -p tcp --dport 80 -j ACCEPT
    iptables -I INPUT -p tcp --dport 443 -j ACCEPT
    # Try to persist; ignore failures if iptables-save/service is missing
    iptables-save >/etc/sysconfig/iptables 2>/dev/null || true
fi

# 7. Final reload
systemctl reload nginx

echo "SSL setup complete. https://$DOMAIN should now work."
