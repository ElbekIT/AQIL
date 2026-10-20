#!/bin/bash
# “AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI
# Android APK Yig'ish Skripti
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

python3 build_apk.py
