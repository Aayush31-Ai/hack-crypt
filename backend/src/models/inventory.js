import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },


    avatars: {
      type: Map,
      of: Boolean,
      default: {}
      /*
        example:
        {
          av_01: true,
          av_02: false,
          av_03: false
        }
      */
    },

    // 🖼️ frames (cosmetics)
    frames: {
      type: Map,
      of: Boolean,
      default: {}
      /*
        example:
        {
          f1: true,
          f2: false,
          f3: false
        }
      */
    }
  },
  {
    timestamps: true
  }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
