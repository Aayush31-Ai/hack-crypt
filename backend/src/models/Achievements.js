import mongoose from "mongoose";

const achievementsSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // 🏆 all achievements (locked / unlocked)
    achievements: {
      type: Map,
      of: Boolean,
      default: {}
      /*
        example:
        {
          first_level_complete: true,
          first_zone_complete: false,
          streak_7_days: false,
          xp_1000: false
        }
      */
    }
  },
  {
    timestamps: true
  }
);

export const Achievements = mongoose.model(
  "Achievements",
  achievementsSchema
);
