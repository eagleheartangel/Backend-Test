import {
  prop,
  modelOptions,
  getModelForClass,
  plugin,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import moment from "moment";

const AutoIncrementFactory = require("mongoose-sequence");
const AutoIncrement = AutoIncrementFactory(mongoose);

@modelOptions({
  schemaOptions: {
    timestamps: false,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;
        if (ret.date) {
          ret.date = moment(ret.date).format("YYYY-MM-DD HH:mm:ss");
        }
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        delete ret._id;
        if (ret.date) {
          ret.date = moment(ret.date).format("YYYY-MM-DD HH:mm:ss");
        }
      },
    },
  },
})
@plugin(AutoIncrement, { inc_field: "id" })
class User {
  @prop({ required: true, trim: true, maxlength: 50 })
  nombre: string;

  @prop({ required: true })
  edad: number;

  @prop({ required: true, type: Date, default: () => new Date() })
  date: Date;
}

const UserModel = getModelForClass(User);
export default UserModel;
