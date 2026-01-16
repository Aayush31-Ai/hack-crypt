import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // 🔑 unique student identity (roll number / uid)
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    username: {
      type: String,
      required: true,
      trim: true
    },

    // 🎭 currently selected cosmetics
    avatar: {
      selectedAvatar: {
        type: String,
        default: "av_01"
      },
      selectedFrame: {
        type: String,
        default: "f1"
      }
    },

    // 📊 overall stats
    stats: {
      globalXP: {
        type: Number,
        default: 0,
        min: 0
      },
      coins: {
        type: Number,
        default: 0,
        min: 0
      }
    },


  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

export const Student = mongoose.model("Student", studentSchema);
