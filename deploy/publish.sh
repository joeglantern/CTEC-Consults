#!/usr/bin/env bash
# Build and publish the site to the VPS. Run from the repo root on your machine:
#
#   bash deploy/publish.sh              # build and push everything except video
#   bash deploy/publish.sh --with-video # also push public/video (about 140 MB)
#
# No sudo is needed once setup-once.sh has run, because /var/www/ctec-consults
# belongs to liban. Video is skipped by default because it is large and rarely
# changes, so a normal deploy moves a few megabytes instead of a hundred and forty.

set -euo pipefail

HOST=liban@156.67.25.84
ROOT=/var/www/ctec-consults
WITH_VIDEO=0
[ "${1:-}" = "--with-video" ] && WITH_VIDEO=1

echo "==> building"
( cd site && npm run build )

cd site/dist
test -f index.html || { echo "build produced no index.html"; exit 1; }

if [ "$WITH_VIDEO" = "1" ]; then
  echo "==> uploading everything including video"
  tar cf - . | ssh "$HOST" "tar xf - -C $ROOT"
else
  echo "==> uploading everything except video"
  tar cf - --exclude=./video . | ssh "$HOST" "tar xf - -C $ROOT"
fi

echo "==> checking the server can see the new build"
ssh "$HOST" "ls -la $ROOT/index.html && du -sh $ROOT"

echo
echo "done. hard refresh the page to get past the browser cache."
