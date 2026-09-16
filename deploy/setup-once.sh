#!/usr/bin/env bash
# One time server setup for the CTEC Consults site. Run this on the VPS as liban.
# It needs sudo, so it will ask for your password.
#
#   bash ~/ctec-deploy-setup/setup-once.sh
#
# It only ever touches paths that belong to this site. It never edits, moves or
# reloads anything belonging to another site, and it refuses to run if the nginx
# config does not pass its own syntax check.

set -euo pipefail

SITE=ctec-consults
ROOT=/var/www/$SITE
STAGING=$HOME/ctec-deploy
CONF_SRC=$HOME/ctec-deploy-setup/ctec-consults.nginx.conf
CONF=/etc/nginx/sites-available/$SITE

echo "==> checking the staged build exists"
test -f "$STAGING/index.html" || { echo "no build at $STAGING, upload it first"; exit 1; }
test -f "$CONF_SRC" || { echo "no nginx config at $CONF_SRC"; exit 1; }

echo "==> creating $ROOT owned by $USER"
sudo mkdir -p "$ROOT"
sudo chown "$USER:$USER" "$ROOT"
sudo chmod 755 "$ROOT"

echo "==> copying the build into place"
cp -a "$STAGING/." "$ROOT/"

echo "==> installing the nginx site"
sudo cp "$CONF_SRC" "$CONF"
sudo ln -sfn "$CONF" "/etc/nginx/sites-enabled/$SITE"

echo "==> testing the whole nginx config before touching the running server"
if ! sudo nginx -t; then
  echo "nginx config test FAILED, rolling back so nothing changes"
  sudo rm -f "/etc/nginx/sites-enabled/$SITE"
  exit 1
fi

echo "==> reloading nginx (reload, not restart, so live sites keep serving)"
sudo systemctl reload nginx

echo
echo "done. the site is served from $ROOT"
echo "preview it at http://156.67.25.84:8088"
echo
echo "if that port does not answer from outside, open it with:"
echo "    sudo ufw allow 8088/tcp"
