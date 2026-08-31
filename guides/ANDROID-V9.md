# 📶 ADB Wireless Setup — Android 9

> Guide for connecting Appium to an Android 9 device over Wi-Fi (no USB cable required), plus a fix for the permission issues commonly seen on Android 9 and above.

## ✅ Requirements

- [X] **Enable Developer Mode**: `Settings → About Phone → tap "Build Number" 7x` (skip this if Developer Options already shows up in Settings)
- [X] **USB Debugging** enabled: `Settings → Developer Options → USB Debugging (Enable)`
- [X] **USB Configuration** set to `MTP` (Media Transfer Protocol)
- [X] Phone and Laptop/PC **must** be connected to the **same** Wi-Fi/router

---

## 🚀 Setup Steps

### 1️⃣ Connect the Phone via USB & Check Its IP Address

Plug in the USB cable as usual, then check the phone's IP address:

```
Settings → About Phone → Status → IP Address
```

> 📱 Example phone IP: `192.168.1.15`

### 2️⃣ Enable TCP/IP Mode via Terminal

Open a terminal/PowerShell on your PC and run:

```bash
adb tcpip 5555
```

On success, you'll see:

```
restarting in TCP mode port: 5555
```

### 3️⃣ Unplug the USB Cable

You can now unplug the USB cable from both the phone and the PC.

### 4️⃣ Connect ADB over Wi-Fi

```bash
adb connect 192.168.1.15:5555
```

> Replace `192.168.1.15` with your phone's IP.

### 5️⃣ Verify the Connection

```bash
adb devices
```

Expected output:

```
List of devices attached
192.168.1.15:5555    device
```

---

## ⚙️ Update `wdio.belajar.conf.js` Configuration

Update `appium:udid` with the `IP:PORT` from the wireless connection above:

```javascript
capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'OPPO XGP3073',
    'appium:udid': '192.168.1.15:5555', // 👈 Changed from USB ID to Wireless IP
    'appium:app': path.join(process.cwd(), './app-release.apk'),
    'appium:ignoreHiddenApiPolicyError': true,
    'appium:noReset': false,
    'appium:autoGrantPermissions': true
}]
```

> 💡 This `appium:udid` value can also be set directly as the `UDID` variable in your `.env` file (see `.env.example` in the project root).

## ▶️ Run the Tests

```bash
npm run test:belajar
```

---

## 💡 Additional Tips

- 🔌 If the phone restarts or Wi-Fi disconnects, plug in the USB cable briefly to re-run `adb tcpip 5555`.
- 🔌 To disconnect the wireless session: `adb disconnect`