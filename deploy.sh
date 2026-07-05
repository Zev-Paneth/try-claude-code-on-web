#!/usr/bin/env bash
# One-command deployment of mail-image-bot on an Ubuntu VPS.
# Run from the repo directory:  sudo ./deploy.sh
set -euo pipefail

APP_DIR=/opt/mail-image-bot
ENV_FILE="$APP_DIR/mail-image-bot.env"
SERVICE=mail-image-bot
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "$(id -u)" -ne 0 ]; then
    echo "This script must run as root:  sudo ./deploy.sh" >&2
    exit 1
fi

echo "==> Installing system packages (python3, python3-venv)"
apt-get update -qq
DEBIAN_FRONTEND=noninteractive apt-get install -y -qq python3 python3-venv >/dev/null

echo "==> Creating service user 'mailbot'"
if ! id -u mailbot >/dev/null 2>&1; then
    useradd --system --no-create-home --shell /usr/sbin/nologin mailbot
fi

echo "==> Installing application into $APP_DIR"
mkdir -p "$APP_DIR"
install -m 755 "$SRC_DIR/bot.py" "$APP_DIR/bot.py"
install -m 644 "$SRC_DIR/requirements.txt" "$APP_DIR/requirements.txt"

echo "==> Creating virtualenv and installing dependencies"
python3 -m venv "$APP_DIR/venv"
"$APP_DIR/venv/bin/pip" install --quiet --upgrade pip
"$APP_DIR/venv/bin/pip" install --quiet -r "$APP_DIR/requirements.txt"

if [ ! -f "$ENV_FILE" ]; then
    install -m 600 "$SRC_DIR/mail-image-bot.env.example" "$ENV_FILE"
fi
chmod 600 "$ENV_FILE"

echo "==> Installing systemd service"
install -m 644 "$SRC_DIR/mail-image-bot.service" "/etc/systemd/system/$SERVICE.service"
systemctl daemon-reload
systemctl enable "$SERVICE" >/dev/null 2>&1

echo
echo "Installation complete. The service is enabled but NOT started yet."
echo

# Deliberate stop before starting: collect the Gmail credentials first.
read -r -p "Enter your Gmail address (or press Enter to edit $ENV_FILE manually later): " EMAIL_USER_INPUT
if [ -n "$EMAIL_USER_INPUT" ]; then
    read -r -s -p "Enter your Gmail App Password (input hidden): " EMAIL_PASS_INPUT
    echo
    if [ -z "$EMAIL_PASS_INPUT" ]; then
        echo "No App Password entered; leaving $ENV_FILE for you to edit manually." >&2
    else
        umask 177
        cat > "$ENV_FILE" <<EOF
EMAIL_USER=$EMAIL_USER_INPUT
EMAIL_PASS=$EMAIL_PASS_INPUT
EOF
        chmod 600 "$ENV_FILE"
        echo "Credentials written to $ENV_FILE (permissions 600)."
    fi
fi

echo
read -r -p "Start the service now? [y/N] " START_NOW
if [[ "$START_NOW" =~ ^[Yy]$ ]]; then
    systemctl start "$SERVICE"
    sleep 2
    systemctl --no-pager --full status "$SERVICE" || true
    echo
    echo "The service is running. Follow the logs with:"
    echo "    journalctl -u $SERVICE -f"
    echo
    echo "End-to-end test: send an email to your own Gmail address with a direct"
    echo "image link in the body (e.g. https://picsum.photos/800.jpg). Within a"
    echo "few seconds you should receive a reply on the same thread with the"
    echo "image attached."
else
    echo "Not started. When ready:"
    echo "    1. Put your credentials in $ENV_FILE"
    echo "    2. sudo systemctl start $SERVICE"
    echo "    3. journalctl -u $SERVICE -f"
fi
