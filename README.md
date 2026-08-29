# 📱 Mobile Test Automation

<p align="center">
  <img src="https://img.shields.io/badge/Appium-2.19.0-9B4FE0?logo=appium&logoColor=white" alt="Appium" />
  <img src="https://img.shields.io/badge/WebdriverIO-9.30.1-EA5906?logo=webdriverio&logoColor=white" alt="WebdriverIO" />
  <img src="https://img.shields.io/badge/Mocha-Test%20Framework-8D6748?logo=mocha&logoColor=white" alt="Mocha" />
  <img src="https://img.shields.io/badge/Allure-Report-FF3B3F?logo=qameta&logoColor=white" alt="Allure" />
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?logo=android&logoColor=white" alt="Android" />
</p>

<p align="center">
  End-to-end mobile automation for <b>two Android apps</b> — Belajar Bareng and SauceLabs My Demo App — powered by Appium, WebdriverIO, and Mocha.
</p>

---

## 📑 Table of Contents

- [📱 Mobile Test Automation](#-mobile-test-automation)
  - [📑 Table of Contents](#-table-of-contents)
  - [🧰 Tech Stack](#-tech-stack)
  - [📂 Project Structure](#-project-structure)
  - [✅ Prerequisites](#-prerequisites)
  - [📥 Installation](#-installation)
  - [📲 Emulator Setup (PowerShell)](#-emulator-setup-powershell)
  - [🚀 Running Appium Server](#-running-appium-server)
  - [🧪 Running Tests](#-running-tests)
  - [📊 Test Reports](#-test-reports)
  - [🔍 Finding appPackage \& appActivity](#-finding-apppackage--appactivity)
  - [⚙️ Configuration Notes](#️-configuration-notes)
  - [🙈 .gitignore](#-gitignore)

---

## 🧰 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| 🤖 Appium | `^2.19.0` | Mobile automation engine |
| 📦 appium-uiautomator2-driver | `^4.2.9` | Android driver (UiAutomator2) |
| 🌐 WebdriverIO | `^9.30.1` | Test runner & session management |
| ☕ Mocha | via `@wdio/mocha-framework` | Test framework |
| ✅ Chai | `^6.2.2` | Assertion library |
| 📊 Allure Reporter | `^2.43.0` | Rich HTML test reports |

## 📂 Project Structure

```
sesi11/
├── apps/
│   ├── app-release.apk          # Belajar Bareng APK
│   └── mda-2.2.0-25.apk         # SauceLabs My Demo App APK
├── config/
│   ├── wdio.conf.js             # 🧩 Base config (runner, host, port, framework)
│   ├── wdio.belajar.conf.js     # ➕ Extends base -> Belajar Bareng
│   └── wdio.demo.conf.js        # ➕ Extends base -> SauceLabs Demo
├── test/
│   ├── belajar-bareng/
│   │   └── app.test.js
│   └── demo/
│       └── app.test.js
├── allure-results/               # 🗃️ Raw test results (gitignored)
├── allure-report/                 # 📈 Generated HTML report
├── package.json
└── README.md
```

## ✅ Prerequisites

- **Node.js** (LTS) installed
- **Android SDK** installed, with the following environment variables set (Windows example):
  ```
  ANDROID_HOME=C:\Users\USER\AppData\Local\Android\Sdk
  ANDROID_SDK_ROOT=C:\Users\USER\AppData\Local\Android\Sdk
  ```
- An **AVD (emulator)** already created, e.g. `Pixel_5`
- Target APKs available under `apps/`

## 📥 Installation

```bash
npm install
```

## 📲 Emulator Setup (PowerShell)

```powershell
# Check connected device/emulator
adb devices

# Start the emulator (if not running)
Start-Process emulator -ArgumentList "-avd Pixel_5 -wipe-data"

# Kill the emulator
adb emu kill
```

> 💡 Other `emulator` arguments (AVD name, `-wipe-data`, etc.) can be checked via `adb devices` and `emulator -help`.

## 🚀 Running Appium Server

The base config (`config/wdio.conf.js`) points to `127.0.0.1:4723`, so the Appium server must be started manually in a separate terminal before running tests:

```bash
npx appium
```

## 🧪 Running Tests

| Command | Description |
|---|---|
| `npm run test:belajar` | Run Belajar Bareng suite only |
| `npm run test:demo` | Run SauceLabs Demo suite only |
| `npm run test:all` | Run both suites sequentially |

## 📊 Test Reports

Generate rich HTML reports with Allure:

| Command | Output |
|---|---|
| `npm run allure:belajar` | `allure-report/belajar-bareng` |
| `npm run allure:demo` | `allure-report/demo` |
| `npm run allure:combined` | `allure-report/combined` |

## 🔍 Finding appPackage & appActivity

To automate a new APK, install and open the app on the device/emulator first, then run:

```bash
adb shell "dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'"
```

Use the output to fill in `appium:appPackage` and `appium:appActivity` in a new config file (`config/wdio.<app-name>.conf.js`), following the pattern set by `wdio.belajar.conf.js` / `wdio.demo.conf.js`.

## ⚙️ Configuration Notes

- **`config/wdio.conf.js`** — base config: `runner: 'local'`, connects to Appium at `127.0.0.1:4723`, `mocha` framework with a 60s timeout.
- **`config/wdio.belajar.conf.js`** / **`config/wdio.demo.conf.js`** — extend the base config, overriding only `specs`, `capabilities` (APK path, `appPackage`, `appActivity`), and `reporters`.
- **`appium:noReset: true`** is set in both configs so app state isn't reset between runs, keeping test execution fast.
- **Reporters**: `spec` (console output) + `allure` (writes to a separate `allure-results/<app-name>` folder per app, so reports don't mix).

## 🙈 .gitignore

```gitignore
node_modules
allure-results
# allure-report
```

- `node_modules` and `allure-results` are ignored.
- `allure-report` is **not** ignored (line is commented out) — the generated HTML report stays tracked in git so it can be viewed directly from the repo without regenerating it.

<!-- ---

<p align="center">Built with ☕ and 🤖 for Digital Skola QA Bootcamp — Session 11</p> -->