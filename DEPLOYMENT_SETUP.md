# VPS CI/CD Deployment Setup Guide

This project includes an automated GitHub Actions CI/CD workflow configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Every push to the `master` branch will automatically:
1. Checkout and install dependencies (`npm ci`)
2. Typecheck and build the production bundle (`npm run build`)
3. Sync the compiled `dist/` files directly to your VPS (`167.86.92.95`) at `/var/www/portfolio` via secure SSH/rsync
4. Set file permissions (`chmod -R 755 /var/www/portfolio`) and reload Nginx

---

## 1. Configure GitHub Repository Secrets

Go to your repository settings:
**`https://github.com/nusairAhamed/Nusair-Portfolio-Marketing-Automation/settings/secrets/actions`**

Click **New repository secret** and add the following:

| Secret Name | Value | Required? |
|---|---|---|
| `VPS_SSH_KEY` | Your **Private SSH Key** (the contents of `~/.ssh/id_ed25519` or `~/.ssh/id_rsa` on the server) | **Yes** |
| `VPS_USERNAME` | Your server SSH username (e.g., `root` or `ubuntu`) | Optional (defaults to `root`) |
| `VPS_HOST` | `167.86.92.95` | Optional (defaults to `167.86.92.95`) |
| `VPS_TARGET_DIR` | `/var/www/portfolio` | Optional (defaults to `/var/www/portfolio`) |
| `VPS_PORT` | `22` | Optional (defaults to `22`) |

---

## 2. Generate SSH Key on VPS (If you don't have one yet)

SSH into your VPS (`ssh root@167.86.92.95`) and run:

```bash
# 1. Generate a dedicated Ed25519 key pair for GitHub Actions
ssh-keygen -t ed25519 -C "github-actions-portfolio" -f ~/.ssh/github_actions_key -N ""

# 2. Add the public key to authorized_keys so the server accepts it
cat ~/.ssh/github_actions_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 3. Print the private key (Copy the ENTIRE output including BEGIN and END lines)
cat ~/.ssh/github_actions_key
```

Paste the private key output into GitHub Secrets as **`VPS_SSH_KEY`**.

---

## 3. Recommended Nginx Configuration on VPS

To serve your portfolio from `/var/www/portfolio` and ensure single-page application (SPA) routing works smoothly on page refreshes:

On your VPS, edit `/etc/nginx/sites-available/portfolio` (or `/etc/nginx/conf.d/portfolio.conf`):

```nginx
server {
    listen 80;
    server_name 167.86.92.95; # or your custom domain name (e.g. nusair.dev)

    root /var/www/portfolio;
    index index.html;

    # Gzip compression for high performance
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets (images, fonts, scripts)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|webp)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the site and reload Nginx:
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 4. Triggering Deployments

- **Automatic**: Push any changes to the `master` branch (`git push origin master`).
- **Manual**: Go to **Actions** tab in GitHub > **CI/CD - Build & Deploy to VPS** > click **Run workflow**.
