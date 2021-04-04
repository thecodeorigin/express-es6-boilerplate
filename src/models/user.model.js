import MongooseProvider from "../providers/MongooseProvider";
export const User = MongooseProvider.getInstance().exportModel('User',
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
  })
