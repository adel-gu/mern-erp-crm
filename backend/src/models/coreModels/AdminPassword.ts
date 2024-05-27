import mongoose, { Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IAdminPassword {
  active: boolean;
  userId: Types.ObjectId;
  password: string;
  createdAt: Date;
  salt: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
}

interface IAdminPasswordMethods {
  checkIsPasswordCorrect(
    password: string,
    hashPassword: string,
  ): Promise<boolean>;
}

type AdminPasswordModelType = Model<IAdminPassword, {}, IAdminPasswordMethods>;

const schema = new mongoose.Schema<
  IAdminPassword,
  AdminPasswordModelType,
  IAdminPasswordMethods
>({
  active: { type: Boolean, default: true, select: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', unique: true },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm Password field is required'],
    validate: {
      validator: function (this: IAdminPassword, val: string): boolean {
        return this.password === val;
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  salt: String,
  passwordChangedAt: Date,
});

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password + this.salt, this.salt);
  this.passwordConfirm = undefined;
  next();
});

schema.method(
  'checkIsPasswordCorrect',
  async function checkIsPasswordCorrect(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password + this.salt, hashPassword);
  },
);

const AdminPassword = mongoose.model<IAdminPassword, AdminPasswordModelType>(
  'AdminPassword',
  schema,
);
export default AdminPassword;
