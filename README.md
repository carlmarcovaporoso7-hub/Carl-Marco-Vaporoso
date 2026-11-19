# Portfolio

Personal portfolio website of **Carl Marco R. Vaporoso**, a Computer Science student at Biliran Province State University.
It is built with plain **HTML, CSS and JavaScript**: no framework, no build step and no installation needed.

**Live site:** https://carlmarcovaporoso7-hub.github.io/Carl-Marco-Vaporoso/

---

## 1. Requirements

### What you need to install

| Software | Version | Download |
|---|---|---|
| Web browser | Chrome, Edge, Firefox or Safari (latest) | Already on your computer |
| Git | Any recent version | https://git-scm.com/downloads |
| Code editor (optional) | Any | https://code.visualstudio.com/ |
| Python (optional) | 3.8 or newer, only for running a local server | https://www.python.org/downloads/ |

### Computer requirements

- **Operating system:** Windows 10/11, macOS 12 or newer, or Linux
- **RAM:** 2 GB minimum
- **Free disk space:** about 30 MB (mostly the images)
- **Internet connection:** needed to load the fonts (Google Fonts: Space Grotesk and Inter) and the icons (Phosphor Icons). Without internet the site still opens, but icons and fonts will be missing.

### Project packages

There are **no packages to install**. There is no `npm install`, no `node_modules` folder, no database, and no API keys or `.env` file.

The only outside resources are loaded from the internet when the page opens:

| Resource | Version | Used for |
|---|---|---|
| Phosphor Icons | 2.1.1 | Icons in the menu, buttons and cards |
| Google Fonts | Space Grotesk, Inter | Headings and body text |

---

## 2. Check that everything is installed

Open a terminal (Command Prompt, PowerShell, or Terminal on Mac) and run:

```bash
git --version
python --version
```

Each command should print a version number. If a command says "not recognized" or "command not found", install that program from the table above and restart the terminal. Python is optional: you only need it for step 3, option B.

---

## 3. How to run it

1. **Download the project:**

   ```bash
   git clone https://github.com/carlmarcovaporoso7-hub/Carl-Marco-Vaporoso.git
   cd Carl-Marco-Vaporoso
   ```

   (Or on GitHub click **Code → Download ZIP** and unzip it.)

2. **Open the website.** Choose one option:

   **Option A: Just open the file (easiest)**
   Double-click `index.html`. It opens in your browser.

   **Option B: Run a local server (recommended)**
   This behaves exactly like the live site.

   ```bash
   python -m http.server 8080
   ```

   Then open http://localhost:8080 in your browser. Press `Ctrl + C` in the terminal to stop the server.

   **Option C: VS Code**
   Install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

---

## 4. Project structure

```text
Carl-Marco-Vaporoso/
├── index.html               Main page (all sections)
├── style.css                All styles, including light and dark themes
├── script.js                Menu, theme toggle, slideshows, certificate viewer
├── LOGO/                    Site logo and technology icons
├── about me picture/        Hero profile photo
├── home profile pic/        About Me photo
├── intelliguide pictures/   IntelliGuide screenshots
├── coco Scan pictures/      CocoScan screenshots
├── foodie finder/           Foodie Finder screenshots
└── certificates/            Certificate images
```

### Website sections

| Section | What it shows |
|---|---|
| Home | Introduction, typewriter roles and orbiting skill icons |
| About Me | Short bio, interests and focus |
| Skills | Python, HTML5, CSS3, JavaScript, Flutter, Dart |
| Projects | IntelliGuide (thesis), CocoScan and Foodie Finder, each with a screenshot slideshow |
| Education | B.S. Computer Science, Biliran Province State University |
| Certificates | Certificate carousel with a full-size viewer |
| Contact | Email, Facebook and Instagram |

---

## 5. How to edit it

| To change... | Edit this |
|---|---|
| Text, projects, links or images | `index.html` |
| Colors, spacing, fonts or layout | `style.css` |
| Typewriter words (`CS Student`, `Web Developer`) | `roles` list in `script.js` |
| Slideshow speed (4 seconds) | `setInterval(..., 4000)` in `script.js` |

To add a new screenshot, put the image in the project's folder and add another `ig-slide` block and `ig-dot` button in `index.html`, copying an existing one.

> **Note:** File and folder names are **case-sensitive** on GitHub Pages. `LOGO/python.svg` works but `logo/python.svg` will not. Spaces in folder names must be written as `%20` in `index.html` (for example `coco%20Scan%20pictures/`).

---

## 6. How to deploy (GitHub Pages)

### First time only

1. Open the repository on GitHub.
2. Click **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to **main** and the folder to **/ (root)**, then click **Save**.
5. Wait 1–2 minutes and refresh. The live link appears at the top of the Pages screen.

The repository must be **Public** to use GitHub Pages on a free account.

### Every time you make changes

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub updates the live site automatically within 1–2 minutes. You can watch progress in the **Actions** tab. If you still see the old version, press `Ctrl + F5` to refresh without the cache.

---

## 7. Contact

- **Email:** carlmarcovaporoso7@gmail.com
- **Facebook:** https://www.facebook.com/carl.marco.regala.vaporoso
- **Instagram:** https://www.instagram.com/hi_crlmrco/

© Carl Marco Vaporoso. All rights reserved.
