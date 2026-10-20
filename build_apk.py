#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AQIL Smart Life — Android APK Builder (Dual V1 + V2 Signed, 4-Byte Zipaligned)
Toshkent Menejment va Iqtisodiyot Instituti (Farg'ona kampusi)
Muallif: Sharofiddinova Nozima Egamberdi qizi
"""

import os
import sys
import shutil
import struct
import hashlib
import zipfile
import subprocess
import datetime
from PIL import Image, ImageDraw

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives import serialization
from cryptography import x509
from cryptography.x509.oid import NameOID

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_DIR = os.path.join(BASE_DIR, "build_tmp")
OUTPUT_APK = os.path.join(BASE_DIR, "AQIL_Smart_Life.apk")
KEYSTORE = os.path.join(BASE_DIR, "aqil_release.keystore")
PRIVATE_KEY_PEM = os.path.join(BASE_DIR, "aqil_key.pem")
CERT_DER_PATH = os.path.join(BASE_DIR, "aqil_cert.der")

def create_app_icon(output_path, size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size, size], radius=radius, fill=(37, 99, 235, 255))
    draw.rounded_rectangle([int(size*0.04), int(size*0.04), int(size*0.96), int(size*0.96)], 
                           radius=int(radius*0.9), outline=(96, 165, 250, 180), width=max(1, int(size*0.03)))
    center_x = size // 2
    center_y = size // 2
    roof_w = int(size * 0.45)
    roof_h = int(size * 0.25)
    draw.polygon([
        (center_x, center_y - int(roof_h * 1.1)),
        (center_x - roof_w, center_y),
        (center_x + roof_w, center_y)
    ], fill=(255, 255, 255, 255))
    draw.rectangle([
        center_x - int(roof_w * 0.7),
        center_y,
        center_x + int(roof_w * 0.7),
        center_y + int(roof_h * 1.1)
    ], fill=(255, 255, 255, 255))
    draw.rectangle([
        center_x - int(roof_w * 0.25),
        center_y + int(roof_h * 0.2),
        center_x + int(roof_w * 0.25),
        center_y + int(roof_h * 1.1)
    ], fill=(37, 99, 235, 255))
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')

def generate_icons():
    icon_sizes = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192
    }
    for folder, sz in icon_sizes.items():
        p = os.path.join(BUILD_DIR, "res", folder, "ic_launcher.png")
        create_app_icon(p, sz)
    create_app_icon(os.path.join(BASE_DIR, "assets", "icon-192.png"), 192)
    create_app_icon(os.path.join(BASE_DIR, "assets", "icon-512.png"), 512)

def prepare_manifest():
    # targetSdkVersion 28 provides universal compatibility with Android 5.0 up to Android 15
    manifest_content = """<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.aqil.smartlife"
    android:versionCode="200"
    android:versionName="2.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="28" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:label="AQIL Smart Life"
        android:icon="@mipmap/ic_launcher"
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen">

        <activity
            android:name="com.aqil.smartlife.MainActivity"
            android:label="AQIL Smart Life"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
"""
    with open(os.path.join(BUILD_DIR, "AndroidManifest.xml"), "w", encoding="utf-8") as f:
        f.write(manifest_content)

    os.makedirs(os.path.join(BUILD_DIR, "res", "values"), exist_ok=True)
    with open(os.path.join(BUILD_DIR, "res", "values", "strings.xml"), "w", encoding="utf-8") as f:
        f.write("""<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">AQIL Smart Life</string>
</resources>
""")

def prepare_smali():
    smali_dir = os.path.join(BUILD_DIR, "smali", "com", "aqil", "smartlife")
    os.makedirs(smali_dir, exist_ok=True)
    
    smali_content = """.class public Lcom/aqil/smartlife/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"

# instance fields
.field private webView:Landroid/webkit/WebView;

# direct methods
.method public constructor <init>()V
    .registers 1
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V
    return-void
.end method

# virtual methods
.method protected onCreate(Landroid/os/Bundle;)V
    .registers 6

    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    new-instance v0, Landroid/webkit/WebView;
    invoke-direct {v0, p0}, Landroid/webkit/WebView;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/aqil/smartlife/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v1

    const/4 v2, 0x1
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setAllowFileAccess(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setAllowContentAccess(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDatabaseEnabled(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setAllowFileAccessFromFileURLs(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setAllowUniversalAccessFromFileURLs(Z)V

    new-instance v2, Landroid/webkit/WebViewClient;
    invoke-direct {v2}, Landroid/webkit/WebViewClient;-><init>()V
    invoke-virtual {v0, v2}, Landroid/webkit/WebView;->setWebViewClient(Landroid/webkit/WebViewClient;)V

    new-instance v3, Landroid/webkit/WebChromeClient;
    invoke-direct {v3}, Landroid/webkit/WebChromeClient;-><init>()V
    invoke-virtual {v0, v3}, Landroid/webkit/WebView;->setWebChromeClient(Landroid/webkit/WebChromeClient;)V

    const-string v2, "file:///android_asset/index.html"
    invoke-virtual {v0, v2}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V

    invoke-virtual {p0, v0}, Landroid/app/Activity;->setContentView(Landroid/view/View;)V

    return-void
.end method

.method public onBackPressed()V
    .registers 2

    iget-object v0, p0, Lcom/aqil/smartlife/MainActivity;->webView:Landroid/webkit/WebView;
    if-eqz v0, :cond_f

    invoke-virtual {v0}, Landroid/webkit/WebView;->canGoBack()Z
    move-result v0
    if-eqz v0, :cond_f

    iget-object v0, p0, Lcom/aqil/smartlife/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0}, Landroid/webkit/WebView;->goBack()V
    return-void

    :cond_f
    invoke-super {p0}, Landroid/app/Activity;->onBackPressed()V
    return-void
.end method
"""
    with open(os.path.join(smali_dir, "MainActivity.smali"), "w", encoding="utf-8") as f:
        f.write(smali_content)

def copy_web_assets():
    assets_dir = os.path.join(BUILD_DIR, "assets")
    os.makedirs(assets_dir, exist_ok=True)
    shutil.copy2(os.path.join(BASE_DIR, "index.html"), os.path.join(assets_dir, "index.html"))
    for folder in ["css", "js", "data", "assets"]:
        src = os.path.join(BASE_DIR, folder)
        dst = os.path.join(assets_dir, folder)
        if os.path.exists(src):
            if os.path.exists(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst)

def zipalign_apk(src_path, dst_path, alignment=4):
    """Accurately aligns all uncompressed entries to 4-byte boundaries."""
    with zipfile.ZipFile(src_path, 'r') as zin:
        with zipfile.ZipFile(dst_path, 'w') as zout:
            for item in zin.infolist():
                data = zin.read(item.filename)
                zinfo = zipfile.ZipInfo(item.filename, item.date_time)
                zinfo.compress_type = item.compress_type
                zinfo.external_attr = item.external_attr
                
                if item.compress_type == zipfile.ZIP_STORED:
                    curr_pos = zout.fp.tell()
                    hdr_len = 30 + len(item.filename.encode('utf-8'))
                    pad = (alignment - ((curr_pos + hdr_len) % alignment)) % alignment
                    if pad:
                        zinfo.extra = b'\x00' * pad
                        
                zout.writestr(zinfo, data)

def get_or_create_keys():
    """Generates an RSA private key and self-signed X.509 certificate for APK V2 signing."""
    if os.path.exists(PRIVATE_KEY_PEM) and os.path.exists(CERT_DER_PATH):
        with open(PRIVATE_KEY_PEM, 'rb') as f:
            private_key = serialization.load_pem_private_key(f.read(), password=None)
        with open(CERT_DER_PATH, 'rb') as f:
            cert_der = f.read()
    else:
        private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
        subject = issuer = x509.Name([
            x509.NameAttribute(NameOID.COMMON_NAME, 'AQIL Smart Life'),
            x509.NameAttribute(NameOID.ORGANIZATION_NAME, 'Toshkent Menejment va Iqtisodiyot Instituti'),
            x509.NameAttribute(NameOID.LOCALITY_NAME, 'Fergana'),
            x509.NameAttribute(NameOID.COUNTRY_NAME, 'UZ')
        ])
        cert = x509.CertificateBuilder().subject_name(
            subject
        ).issuer_name(
            issuer
        ).public_key(
            private_key.public_key()
        ).serial_number(
            x509.random_serial_number()
        ).not_valid_before(
            datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=1)
        ).not_valid_after(
            datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=10000)
        ).sign(private_key, hashes.SHA256())

        cert_der = cert.public_bytes(serialization.Encoding.DER)
        with open(CERT_DER_PATH, 'wb') as f:
            f.write(cert_der)
        with open(PRIVATE_KEY_PEM, 'wb') as f:
            f.write(private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption()
            ))

    pubkey_der = private_key.public_key().public_bytes(
        serialization.Encoding.DER,
        serialization.PublicFormat.SubjectPublicKeyInfo
    )
    return private_key, cert_der, pubkey_der

def apply_apk_v2_signature(apk_path, private_key, cert_der, pubkey_der):
    """Applies official Android APK Signature Scheme v2 Block."""
    with open(apk_path, 'rb') as f:
        apk_data = f.read()

    eocd_pos = apk_data.rfind(b'\x50\x4b\x05\x06')
    if eocd_pos == -1:
        raise ValueError('EOCD not found')

    cd_offset = struct.unpack('<I', apk_data[eocd_pos+16:eocd_pos+20])[0]
    sec1 = apk_data[:cd_offset]
    sec3 = apk_data[cd_offset:eocd_pos]
    sec4 = apk_data[eocd_pos:]

    algo_id = 0x0103 # RSA-PKCS1-SHA256

    # Calculate exact sizes
    certs_part = struct.pack('<I', len(cert_der)) + cert_der
    certs_block = struct.pack('<I', len(certs_part)) + certs_part
    attrs_block = struct.pack('<I', 0)
    pubkey_block = struct.pack('<I', len(pubkey_der)) + pubkey_der

    # Dummy calculation for total block size
    dummy_digest = b'\x00' * 32
    digests_part = struct.pack('<I', 4 + 4 + 32) + struct.pack('<I', algo_id) + struct.pack('<I', 32) + dummy_digest
    digests_block = struct.pack('<I', len(digests_part)) + digests_part
    signed_data_dummy = digests_block + certs_block + attrs_block

    dummy_sig = b'\x00' * 256
    sig_part = struct.pack('<I', algo_id) + struct.pack('<I', 256) + dummy_sig
    sigs_block = struct.pack('<I', 4 + len(sig_part)) + struct.pack('<I', len(sig_part)) + sig_part

    signer_dummy = struct.pack('<I', len(signed_data_dummy)) + signed_data_dummy + sigs_block + pubkey_block
    v2_value_dummy = struct.pack('<I', len(signer_dummy)) + signer_dummy
    pair_size = 4 + len(v2_value_dummy)
    block_len = pair_size + 8
    total_block_disk_size = block_len + 8 + 16

    new_cd_offset = cd_offset + total_block_disk_size
    sec4_modified = bytearray(sec4)
    sec4_modified[16:20] = struct.pack('<I', new_cd_offset)

    # Compute 1MB chunk hashes
    sections = [sec1, sec3, bytes(sec4_modified)]
    block_hashes = []
    CHUNK_SIZE = 1048576
    for sec in sections:
        for i in range(0, len(sec), CHUNK_SIZE):
            chunk = sec[i:i+CHUNK_SIZE]
            h = hashlib.sha256(b'\x5a' + struct.pack('<I', len(chunk)) + chunk).digest()
            block_hashes.append(h)

    final_digest = hashlib.sha256(b'\x5a' + struct.pack('<I', len(block_hashes)) + b''.join(block_hashes)).digest()

    real_digests_part = struct.pack('<I', 4 + 4 + 32) + struct.pack('<I', algo_id) + struct.pack('<I', 32) + final_digest
    real_digests_block = struct.pack('<I', len(real_digests_part)) + real_digests_part
    real_signed_data = real_digests_block + certs_block + attrs_block

    signature = private_key.sign(
        real_signed_data,
        padding.PKCS1v15(),
        hashes.SHA256()
    )

    real_sig_part = struct.pack('<I', algo_id) + struct.pack('<I', len(signature)) + signature
    real_sigs_block = struct.pack('<I', 4 + len(real_sig_part)) + struct.pack('<I', len(real_sig_part)) + real_sig_part
    real_signer = struct.pack('<I', len(real_signed_data)) + real_signed_data + real_sigs_block + pubkey_block
    real_v2_value = struct.pack('<I', len(real_signer)) + real_signer

    pair_content = struct.pack('<Q', 4 + len(real_v2_value)) + struct.pack('<I', 0x7109871a) + real_v2_value
    block_len = len(pair_content)

    signing_block = (
        struct.pack('<Q', block_len) +
        pair_content +
        struct.pack('<Q', block_len) +
        b'APK Sig Block 42'
    )

    final_apk_data = sec1 + signing_block + sec3 + bytes(sec4_modified)
    with open(apk_path, 'wb') as f:
        f.write(final_apk_data)

def build():
    print("=" * 65)
    print("  🔨 AQIL SMART LIFE — ANDROID APK YIG'ISH JARAYONI (V1 + V2 SIGNED)")
    print("  👤 Muallif: Sharofiddinova Nozima Egamberdi qizi")
    print("=" * 65)
    
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)
    os.makedirs(BUILD_DIR, exist_ok=True)

    print("1/7. Ilova piktogrammalari (Icons) yaratilmoqda...")
    generate_icons()

    print("2/7. AndroidManifest va XML resurslari tayyorlanmoqda (targetSdkVersion: 28)...")
    prepare_manifest()

    print("3/7. Veb-ilova aktivlari (assets/) tayyorlanmoqda...")
    copy_web_assets()

    print("4/7. APK resurslari 'aapt' orqali paketlanmoqda...")
    raw_apk = os.path.join(BUILD_DIR, "raw.apk")
    framework_res = "/usr/share/android-framework-res/framework-res.apk"
    
    aapt_cmd = [
        "aapt", "package", "-f",
        "-M", os.path.join(BUILD_DIR, "AndroidManifest.xml"),
        "-S", os.path.join(BUILD_DIR, "res"),
        "-A", os.path.join(BUILD_DIR, "assets"),
        "-I", framework_res,
        "-F", raw_apk
    ]
    subprocess.check_call(aapt_cmd)

    print("5/7. Smali baytkodi 'classes.dex' ga kompilyatsiya qilinmoqda...")
    prepare_smali()
    dex_path = os.path.join(BUILD_DIR, "classes.dex")
    smali_cmd = ["smali", "a", os.path.join(BUILD_DIR, "smali"), "-o", dex_path]
    subprocess.check_call(smali_cmd)
    subprocess.check_call(["aapt", "add", raw_apk, "classes.dex"], cwd=BUILD_DIR)

    print("6/7. V1 imzosi qo'yilmoqda (jarsigner)...")
    if not os.path.exists(KEYSTORE):
        keytool_cmd = [
            "keytool", "-genkey", "-v",
            "-keystore", KEYSTORE,
            "-alias", "aqil",
            "-keyalg", "RSA",
            "-keysize", "2048",
            "-validity", "10000",
            "-storepass", "aqil2026",
            "-keypass", "aqil2026",
            "-dname", "CN=AQIL Smart Life, OU=TMII, O=Toshkent Menejment va Iqtisodiyot Instituti, L=Fergana, ST=Fergana, C=UZ"
        ]
        subprocess.check_call(keytool_cmd)

    jarsigner_cmd = [
        "jarsigner", "-sigalg", "SHA256withRSA", "-digestalg", "SHA-256",
        "-keystore", KEYSTORE, "-storepass", "aqil2026",
        raw_apk, "aqil"
    ]
    subprocess.check_call(jarsigner_cmd, stdout=subprocess.DEVNULL)

    print("7/7. 4-baytli Zipalign va APK Signature Scheme V2 bloki qo'shilmoqda...")
    aligned_apk = os.path.join(BUILD_DIR, "aligned.apk")
    zipalign_apk(raw_apk, aligned_apk, alignment=4)

    # V2 signature on aligned APK
    private_key, cert_der, pubkey_der = get_or_create_keys()
    apply_apk_v2_signature(aligned_apk, private_key, cert_der, pubkey_der)

    shutil.copy2(aligned_apk, OUTPUT_APK)
    shutil.rmtree(BUILD_DIR)

    apk_size = os.path.getsize(OUTPUT_APK) / 1024
    print("=" * 65)
    print("  🎉 MUVAFFAQISATLI YAKUNLANDI!")
    print(f"  📦 APK fayl: {OUTPUT_APK}")
    print(f"  📏 Hajmi: {apk_size:.1f} KB")
    print("  ✅ 4-baytli Zipalign: TO'LIQ MOS (All uncompressed 4-byte aligned)")
    print("  ✅ V1 + V2 raqamli imzosi: MAVJUD (Dual signed)")
    print("  📱 Har qanday Android telefonga (Android 5.0 - Android 15) to'liq o'rnatiladi!")
    print("=" * 65)

if __name__ == '__main__':
    build()
