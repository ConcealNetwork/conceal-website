# VPS Deployment Guide

## Quick Deploy

```bash
cd modern
./deploy.sh
```

## Manual Steps

1. **SSH into your VPS**
   ```bash
   ssh user@your-vps-ip
   ```

2. **Navigate to project**
   ```bash
   cd /path/to/conceal-website/modern
   ```

3. **Pull & Build**
   ```bash
   git pull
   npm ci
   npm run build
   ```

4. **Deploy to web root**
   ```bash
   sudo cp -r dist/* /var/www/conceal.network/
   sudo systemctl reload nginx
   ```

## Nginx Setup

1. Copy the example config:
   ```bash
   sudo cp modern/nginx.conf.example /etc/nginx/sites-available/conceal.network
   ```

2. Update paths in the config file

3. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/conceal.network /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. Setup SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d conceal.network -d www.conceal.network
   ```

## Advantages of VPS Deployment

✅ **Full control** - Custom server-side logic  
✅ **Nginx proxy** - Handle pools API CORS server-side  
✅ **Better performance** - Optimize caching, compression  
✅ **Custom headers** - Security, SEO  
✅ **No GitHub Pages limitations** - Run any server-side features  

