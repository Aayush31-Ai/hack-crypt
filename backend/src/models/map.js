import mongoose from "mongoose";

/* =========================
   Question Schema
========================= */
const questionSchema = new mongoose.Schema(
  {
    qid: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["mcq", "input"],
      required: true
    },

    question: {
      type: String,
      required: true
    },

    options: {
      type: [String],
      default: []
    },

    correctAnswer: {
      type: String,
      required: true
    },

    explanation: {
      type: String, // learning ke liye
      required: true
    },

    xp: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

/* =========================
   Level Schema
========================= */
const levelSchema = new mongoose.Schema(
  {
    levelId: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    order: {
      type: Number,
      required: true
    },

   totalQuestions: {
      type: Number,
      required: true
    },

    reward: {
      xp: {
        type: Number,
        default: 0
      },
      coins: {
        type: Number,
        default: 0
      }
    },

    questions: {
      type: [questionSchema],
      default: []
    }
  },
  { _id: false }
);

/* =========================
   Zone Schema
========================= */
const zoneSchema = new mongoose.Schema(
  {
    zoneId: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    order: {
      type: Number,
      required: true
    },

    // 🎁 reward on ZONE completion
    reward: {
      badgeId: {
        type: String,
        required: true
      },
      xp: {
        type: Number,
        default: 0
      }
    },

    levels: {
      type: [levelSchema],
      default: []
    }
  },
  { _id: false }
);

/* =========================
   MAP / SUBJECT Schema
========================= */
const mapSchema = new mongoose.Schema(
  {
    mapId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    name: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    about: {
      type: String
    },

    order: {
      type: Number,
      default: 1
    },

    isActive: {
      type: Boolean,
      default: true
    },

    zones: {
      type: [zoneSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Map = mongoose.model("Map", mapSchema);
