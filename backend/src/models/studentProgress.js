import mongoose from "mongoose";

const levelProgressSchema = new mongoose.Schema(
  {
    unlocked: {
      type: Boolean,
      default: false
    },

    completed: {
      type: Boolean,
      default: false
    },

    // 🧠 learning state
    currentQuestionIndex: {
      type: Number,
      default: 0
    },

    // ❌ jo galat hue (explanation dikhane ke liye)
    wrongQuestions: {
      type: [String], // qid array
      default: []
    }
  },
  { _id: false }
);

const zoneProgressSchema = new mongoose.Schema(
  {
    unlocked: {
      type: Boolean,
      default: false
    },

    completed: {
      type: Boolean,
      default: false
    },

    levels: {
      type: Map,
      of: levelProgressSchema,
      default: {}
    }
  },
  { _id: false }
);

const mapProgressSchema = new mongoose.Schema(
  {
    totalXP: {
      type: Number,
      default: 0
    },

    zones: {
      type: Map,
      of: zoneProgressSchema,
      default: {}
    }
  },
  { _id: false }
);

const studentProgressSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    maps: {
      type: Map,
      of: mapProgressSchema,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

export const StudentProgress = mongoose.model(
  "StudentProgress",
  studentProgressSchema
);
