import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, default: "USER" },
    isActive: { type: Boolean, default: true },
    blockIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    providers: {
      google: {
        providerId: { type: String },
      },
      facebook: {
        providerId: { type: String },
      },
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
