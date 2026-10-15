import mongoose from "mongoose";

var Schema = mongoose.Schema;

export const TodolistSchema = mongoose.model(
  "TodolistSchema",
  new Schema(
    {
      userId: {
        type: String,
        required: true,
        index: true,
      },
      tdlId: {
        type: String,
        required: true,
        index: true,
      },
      title: {
        type: String,
        required: true,
      },
      date: Date,
      text: {
        type: String,
        default: "",
      },
      noteType: {
        type: String,
        required: true,
      },
      type: [
        {
          type: String,
          enum: ["image", "audio", "video", "application"],
          required: true,
        },
      ],
      fileIds: [
        {
          type: String,
          required: true,
        },
      ], // GridFS reference for media

      reminderDate: { type: Date }, // new field
      reminderTime: { type: String }, // new field (HH:mm format)
      recurring: {
        type: String,
        enum: ["none", "daily", "weekly", "monthly"],
        default: "none",
      },
      //   googleCalendarEventId: {
      //   type: String,
      //   index: true,
      // },
      createdAt: {
        type: Date,
        index: true,
      },
      updatedAt: {
        type: Date,
        index: true,
      },
      status: {
        type: String,
        enum: ["Completed", "Today", "Upcoming"],
        default: "Future",
      },
      isPin : Number,
    },
    {
      timestamps: true,
    },
  ),
  "TodolistSchema",
);
