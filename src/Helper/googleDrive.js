// helper/googleDrive.js
import { google } from "googleapis";

export function getDriveClient(user) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oAuth2Client.setCredentials(user.googleTokens);
  return google.drive({ version: "v3", auth: oAuth2Client });
}

export async function backupUserData(user, data) {
  const drive = getDriveClient(user);

  // Always create a fresh folder if needed
  const folder = await drive.files.create({
    resource: { name: "AppBackups", mimeType: "application/vnd.google-apps.folder" },
    fields: "id"
  });
  const folderId = folder.data.id;

  const fileName = `backup-${Date.now()}.json`;

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
      mimeType: "application/json",
    },
    media: {
      mimeType: "application/json",
      body: JSON.stringify(data, null, 2), // direct upload from memory
    },
  });

  console.log(`✅ Fresh backup uploaded to ${user.email}'s Google Drive: ${res.data.id}`);
}
