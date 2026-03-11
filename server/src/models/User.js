import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import fileField from "./plugins/fileField.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  },
);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(fileField, { fields: ["profileImage"] });
const User = mongoose.model("User", userSchema);

export default User;
