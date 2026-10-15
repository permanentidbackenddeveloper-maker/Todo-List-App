import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Refresh token must be stored securely per user
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

export async function syncTaskToCalendar(task) {
  if (!task.dueDate) return;

  const event = {
    summary: task.title,
    description: task.description,
    start: { dateTime: task.dueDate },
    end: { dateTime: new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000) },
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 10 }]
    }
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  task.googleCalendarEventId = response.data.id;
  await task.save();
}
