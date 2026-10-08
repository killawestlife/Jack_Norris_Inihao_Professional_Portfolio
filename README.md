# Jack Norris D. Inihao — Professional Portfolio

A simple, responsive employer-focused portfolio built with:

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js
- Express

## 1. Requirements

Install Node.js on your computer.

Check the installation in the VS Code terminal:

```bash
node -v
npm -v
```

## 2. Open the project in Visual Studio Code

Open the folder:

```text
jack-norris-inihao-portfolio
```

## 3. Install the backend dependency

In the VS Code terminal:

```bash
npm install
```

## 4. Start the portfolio

```bash
npm start
```

You should see:

```text
Portfolio running at http://localhost:3000
```

Open:

```text
http://localhost:3000
```

## 5. Test the contact form

Submit the Contact form.

The browser sends the information to:

```text
POST /api/contact
```

The Node.js backend saves submitted messages in:

```text
data/messages.json
```

This gives you a simple working backend for local testing.

## 6. Add your own profile photo

Replace:

```text
assets/profile-placeholder.svg
```

with your own image, for example:

```text
assets/profile.jpg
```

Then change the image line in `index.html`:

```html
<img src="assets/profile.jpg" alt="Jack Norris D. Inihao">
```

## 7. Add your social-media accounts

The footer intentionally does NOT link to real accounts.

Find the social links in `index.html`:

```html
<a href="#" aria-label="Facebook">
<a href="#" aria-label="Instagram">
<a href="#" aria-label="LinkedIn">
<a href="#" aria-label="TikTok">
<a href="#" aria-label="Pinterest">
<a href="#" aria-label="YouTube">
```

Replace each `#` with your own profile URL.

## 8. Portfolio sections

The portfolio includes:

- Home
- About
- Work Experience
- Skills
- Featured Projects
- Contact
- Footer / Social Media

## 9. Contact form production note

For a real deployed website, do not rely on a local JSON file as the permanent database.

For deployment, you can connect the same frontend form to:

- Laravel + MySQL
- Node.js + PostgreSQL/MySQL
- Firebase
- Supabase
- another secure API/database

For now, the included Express backend is intentionally simple so it is easy to understand and demonstrate in Visual Studio Code.

## Resume-based content

The portfolio content is based on the provided resume, including:

- BSIT education at Cordova Public College
- Foundever / Expedia Cruise Account experience
- Imperial Appliance Plaza / EXATECH experience
- Calda Pizza experience
- Customer service, sales, communication, teamwork, problem solving, time management, and IT skills
- Cebuano, Filipino/Tagalog, and English languages

The visual palette follows the resume's dark navy header, white background, and blue accent style.
