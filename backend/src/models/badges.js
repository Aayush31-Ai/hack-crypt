import mongoose from "mongoose";

const badgesSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // 🏅 all badges (locked / unlocked)
    badges: {
      type: Map,
      of: Boolean,
      default: {}
      /*
        example:
        {
          algebra_badge: true,
          linear_equation_badge: false,
          physics_badge: false
        }
      */
    }
  },
  {
    timestamps: true
  }
);

export const Badges = mongoose.model("Badges", badgesSchema);
