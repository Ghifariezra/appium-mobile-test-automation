# 📱 Mobile Test Automation

<p align="center">
  <img src="https://img.shields.io/badge/Appium-2.19.0-9B4FE0?logo=appium&logoColor=white" alt="Appium" />
  <img src="https://img.shields.io/badge/WebdriverIO-9.30.1-EA5906?logo=webdriverio&logoColor=white" alt="WebdriverIO" />
  <img src="https://img.shields.io/badge/Mocha-Test%20Framework-8D6748?logo=mocha&logoColor=white" alt="Mocha" />
  <img src="https://img.shields.io/badge/Allure-Report-FF3B3F?logo=qameta&logoColor=white" alt="Allure" />
  <img src="https://img.shields.io/badge/Faker.js-Test%20Data-FF6F61?logo=javascript&logoColor=white" alt="Faker.js" />
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
  - [🔐 Environment Variables](#-environment-variables)
  - [📶 Testing on a Physical Android 9 Device](#-testing-on-a-physical-android-9-device)
  - [📲 Emulator Setup (PowerShell)](#-emulator-setup-powershell)
  - [🚀 Running Appium Server](#-running-appium-server)
  - [🔎 Appium Inspector](#-appium-inspector)
  - [🧪 Running Tests](#-running-tests)
  - [✅ Test Cases — Belajar Bareng](#-test-cases--belajar-bareng)
    - [🔑 Login — Regression (`specs/login.spec.js`)](#-login--regression-specsloginspecjs)
    - [🔥 Smoke — Post \& Logout (`specs/login.spec.js`)](#-smoke--post--logout-specsloginspecjs)
    - [📝 Register (`specs/register.spec.js`)](#-register-specsregisterspecjs)
  - [📊 Test Reports](#-test-reports)
  - [🔍 Finding appPackage \& appActivity](#-finding-apppackage--appactivity)
  - [🧩 Page Object Model (Belajar Bareng)](#-page-object-model-belajar-bareng)
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
| 🎲 @faker-js/faker | `^10.6.0` | Dynamic test data generation |
| 📊 Allure Reporter | `^2.43.0` | Rich HTML test reports |
| 🧭 Appium Inspector | latest | GUI tool for inspecting elements & finding locators |

## 📂 Project Structure

```
sesi11/
├── apps/
│   ├── app-release.apk           # Belajar Bareng APK
│   └── mda-2.2.0-25.apk          # SauceLabs My Demo App APK
├── config/
│   ├── env.conf.js               # 🔐 Loads & validates .env (DEVICE_NAME, UDID)
│   ├── wdio.conf.js              # 🧩 Base config (runner, host, port, framework)
│   ├── wdio.belajar.conf.js      # ➕ Extends base -> Belajar Bareng
│   └── wdio.demo.conf.js         # ➕ Extends base -> SauceLabs Demo
├── guides/
│   └── ANDROID-V9.md             # 📶 ADB Wireless setup guide (Android 9)
├── test/
│   ├── belajar-bareng/
│   │   ├── data/
│   │   │   ├── home.data.js      # Post & logout smoke test cases
│   │   │   ├── index.js          # Combines register + login + post test data
│   │   │   ├── login.data.js     # Data-driven login test cases (faker) — exports userFields, loginErrorMessages
│   │   │   └── register.data.js  # Data-driven register test cases (faker)
│   │   ├── locators/
│   │   │   ├── auth/
│   │   │   │   ├── auth.locator.js      # Shared base: getButton(), getErrorMessage()
│   │   │   │   ├── login.locator.js     # LoginLocators extends AuthLocators
│   │   │   │   └── register.locator.js  # RegisterLocators extends AuthLocators
│   │   │   ├── home.locator.js   # HomeLocators extends AuthLocators (post feed & logout)
│   │   │   └── index.js          # Barrel export
│   │   ├── pages/
│   │   │   ├── base.page.js      # 🧱 Shared page actions
│   │   │   ├── login.page.js     # 📄 Login page object (also exposes Home locators post-login)
│   │   │   └── register.page.js  # 📄 Register page object
│   │   ├── specs/
│   │   │   ├── login.spec.js     # 🧪 Data-driven login tests + post/logout smoke tests
│   │   │   └── register.spec.js  # 🧪 Data-driven register tests
│   │   └── utils/                # (reserved for shared test utilities)
│   └── demo/
│       └── app.test.js
├── .env                          # 🔒 Local device config (gitignored)
├── .env.example                  # Template for .env
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
- An **AVD (emulator)** already created, e.g. `Pixel_5` — or a physical device (see [Testing on a Physical Android 9 Device](#-testing-on-a-physical-android-9-device))
- Target APKs available under `apps/`

## 📥 Installation

```bash
npm install
```

## 🔐 Environment Variables

The Belajar Bareng suite reads its target device from a `.env` file. `config/env.conf.js` loads it and **fails fast** if either variable is missing.

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```
2. Fill in your device values:
   ```
   DEVICE_NAME="your_device_name"
   UDID="your_device_udid"
   ```

## 📶 Testing on a Physical Android 9 Device

`wdio.belajar.conf.js` sets `appium:autoGrantPermissions` and `appium:ignoreHiddenApiPolicyError` to work around permission issues on Android 9+. To run against a physical device over Wi-Fi (no USB cable needed once paired), follow:

👉 **[ADB Wireless Setup Guide — `guides/ANDROID-V9.md`](./guides/ANDROID-V9.md)**

The `UDID` you get from that guide (`IP:PORT`, e.g. `192.168.1.15:5555`) goes straight into your `.env` file.

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

## 🔎 Appium Inspector

Used to inspect the app's UI hierarchy and grab the locators (`resource-id`, `content-desc`, xpath) that back the Page Object files under `test/belajar-bareng/locators/`.

- 📥 Installation guide: [Appium Inspector — Quickstart / Installation](https://appium.github.io/appium-inspector/latest/quickstart/installation/#appium-plugin)
- Connect it to the running Appium server (`127.0.0.1:4723`) with the same capabilities used in `config/wdio.belajar.conf.js` / `config/wdio.demo.conf.js` (see the capability snippet at the top of `specs/register.spec.js`).

## 🧪 Running Tests

| Command | Description |
|---|---|
| `npm run test:belajar` | Run Belajar Bareng suite (register + login specs) |
| `npm run test:demo` | Run SauceLabs Demo suite only |
| `npm run test:all` | Clean old reports, then run both suites sequentially |
| `npm run clean:report` | Remove `allure-results/` and `allure-report/` |

## ✅ Test Cases — Belajar Bareng

Both specs are **data-driven** — each iterates over test cases defined in `test/belajar-bareng/data/`, generating dynamic values (emails, passwords, usernames) via `@faker-js/faker`.

### 🔑 Login — Regression (`specs/login.spec.js`)

| Case | Notes |
|---|---|
| Empty fields | Expects *"Semua field wajib diisi."* |
| Missing email | Only password filled |
| Invalid credentials | Random faker email/password |
| SQL injection in email | `' OR '1'='1` |
| Valid login | Fixed test account, expects success |

### 🔥 Smoke — Post & Logout (`specs/login.spec.js`)

Runs after a successful login using the fixed test account (`userFields` from `login.data.js`). Test cases are defined in `data/home.data.js`.

| Case | Notes |
|---|---|
| Logout successfully | Login → verify Home title → logout → verify back on Login form |
| Create a new post and logout successfully | Login → submit a post with dynamic content (`Date.now()`) → verify the post appears in the feed → logout → verify back on Login form |

### 📝 Register (`specs/register.spec.js`)

| Case | Notes |
|---|---|
| Empty fields / missing username / missing email / missing password | Expects *"Semua field wajib diisi."* |
| Invalid email format | Expects an email-format error |
| Password < 6 characters | Expects *"Password minimal 6 karakter."* |
| Username already exists | Fixed username `qa.tester` |
| Email already exists | Fixed email `qa.tester@qa.tester.com` |
| Valid registration | Random faker data, expects success |
| SQL injection in email / username / password | Edge-case handling per field |

## 📊 Test Reports

Generate rich HTML reports with Allure:

| Command | Output |
|---|---|
| `npm run allure:belajar` | `allure-report/belajar-bareng` |
| `npm run allure:demo` | `allure-report/demo` |
| `npm run allure:combined` | `allure-report/combined` |
| `npm run allure:open` | Opens the combined report in the browser |

## 🔍 Finding appPackage & appActivity

To automate a new APK, install and open the app on the device/emulator first, then run:

```bash
adb shell "dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'"
```

Use the output to fill in `appium:appPackage` and `appium:appActivity` in a new config file (`config/wdio.<app-name>.conf.js`), following the pattern set by `wdio.belajar.conf.js` / `wdio.demo.conf.js`.

## 🧩 Page Object Model (Belajar Bareng)

- **`locators/auth/auth.locator.js`** — `AuthLocators` base class shared by Login, Register & Home: `getButton(text)` and `getErrorMessage(message)` (matches by `content-desc` or `text`).
- **`locators/auth/login.locator.js`** — `LoginLocators extends AuthLocators`: `titleForm`, `usernameInput`, `passwordInput`, `loginBtn`, `toRegister`.
- **`locators/auth/register.locator.js`** — `RegisterLocators extends AuthLocators`: `formRegister`, `getInput(id)`, `registerBtn`.
- **`locators/home.locator.js`** — `HomeLocators extends AuthLocators`: `titleHeader`, `logoutBtn`, `postInput`, `postBtn`, `postList`, `getPostByText(text)`.
- **`locators/index.js`** — barrel file re-exporting `LoginLocators`, `RegisterLocators`, and `HomeLocators`.
- **`pages/base.page.js`** — `BasePage`: `clickElement()`, `setInputValue()` (now also waits for enabled + clears the field first), and `hideKeyboardIfVisible()`.
- **`pages/login.page.js`** — extends `BasePage`, and now composes **two** locator instances: `#loginLocators` (login form fields) and `#homeLocators` (post/logout, exposed post-login). Getters: `usernameInput`, `passwordInput`, `loginBtn`, `titleForm`, `toRegister`, `getErrorMessage()` for login; `titleHome`, `logoutBtn`, `postInput`, `postBtn`, `postList`, `getPostByText()` for home.
- **`pages/register.page.js`** — extends `BasePage`, exposes register locators as getters.
- Both page objects are exported as ready-to-use singletons.

Specs no longer call a single combined `login()`/`register()` helper — they set each field individually via `setInputValue()`, so a test case can leave a field blank on purpose to trigger validation errors.

`login.data.js` now exports `userFields` and `loginErrorMessages` directly (previously module-private `const`s), so `login.spec.js` can reuse the fixed test account and success message for the post/logout smoke tests without duplicating them.

This structure isn't applied to the SauceLabs Demo suite yet — only Belajar Bareng.

## ⚙️ Configuration Notes

- **`config/env.conf.js`** — loads `.env` via Node's `loadEnvFile`, and throws early if `DEVICE_NAME` or `UDID` is missing, before any test session starts.
- **`config/wdio.belajar.conf.js`**:
  - `specs` is now an explicit array (`register.spec.js`, `login.spec.js`) instead of a glob — replacing the old flat `app.test.js`, now split by feature.
  - `appium:deviceName` and `appium:udid` are pulled from `ENV` (via `env.conf.js`) instead of a hardcoded `emulator-5554`.
  - `appium:autoGrantPermissions` and `appium:ignoreHiddenApiPolicyError` were added for Android 9+ permission issues — see [Testing on a Physical Android 9 Device](#-testing-on-a-physical-android-9-device).
- **`npm run test:all`** now runs `clean:report` first, so old Allure results don't leak into a fresh run.
- Reporters unchanged: `spec` (console output) + `allure` (per-app `allure-results/<app-name>` folder).

## 🙈 .gitignore

```gitignore
node_modules
allure-results
.env
.env.*
!.env.example
# allure-report
```

- `node_modules`, `allure-results`, and `.env`/`.env.*` (except the committed `.env.example` template) are ignored.
- `allure-report` is **not** ignored (line is commented out) — the generated HTML report stays tracked in git so it can be viewed directly from the repo without regenerating it.

<!-- ---

<p align="center">Built with ☕ and 🤖 for Digital Skola QA Bootcamp — Session 11</p> -->