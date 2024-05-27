import mongoose, { Model, Query } from 'mongoose';
import validator from 'validator';

enum Roles {
  admin = 'admin',
}

interface IAdmin {
  active: boolean;
  name: string;
  email: string;
  role: Roles;
  createdAt: Date;
  photo?: string;
}

type AdminModelType = Model<IAdmin>;

const schema = new mongoose.Schema<IAdmin, AdminModelType>({
  active: { type: Boolean, default: true, select: false },
  name: { type: String, required: [true, 'Name field is required'] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Name field is required'],
    validate: [validator.isEmail, 'Please provide a correct email'],
    unique: true,
  },
  role: {
    type: String,
    enum: Roles,
    default: Roles.admin,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  photo: String,
});

schema.pre<Query<IAdmin | IAdmin[], AdminModelType>>(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Admin = mongoose.model<IAdmin, AdminModelType>('Admin', schema);
export default Admin;
