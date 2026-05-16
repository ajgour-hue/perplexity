🔹 1. Google Cloud Setup

Go to Google Cloud Console

Create project
Go to Library → Enable Gmail API
Go to Credentials → Create OAuth Client ID
Type → Web Application

Add redirect URIs:

http://localhost
https://developers.google.com/oauthplayground

👉 Copy:

CLIENT_ID
CLIENT_SECRET
🔹 2. Generate Refresh Token

Go to OAuth 2.0 Playground

⚙️ Settings (IMPORTANT)
✔ Use your own OAuth credentials
✔ Access type → Offline
✔ Force prompt → Consent Screen
Step 1:

Select scope:
 
https://mail.google.com/

Click → Authorize APIs

Step 2:

Click → Exchange authorization code

👉 Copy:

refresh_token  ✅ (MOST IMPORTANT)
🔹 3. Install packages
npm init -y
npm install nodemailer dotenv
🔹 4. Create .env
EMAIL_USER=your-email@gmail.com
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REFRESH_TOKEN=your-refresh-token