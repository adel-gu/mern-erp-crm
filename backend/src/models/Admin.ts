import crypto from 'crypto';
import mongoose, { Model, Query } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

enum Roles {
  admin = 'admin',
}

interface IAdmin {
  active: boolean;
  name: string;
  email: string;
  password: string;
  role: Roles;
  salt: string;
  createdAt: Date;
  photo?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

interface IAdminMethods {
  checkIsPasswordCorrect(
    password: string,
    hashPassword: string,
  ): Promise<boolean>;
  generateResetToken(): string;
  checkIsTokenIssuedAfterPwdChanged(JWTTimestamp: number): boolean;
}

type AdminModelType = Model<IAdmin, {}, IAdminMethods>;

const schema = new mongoose.Schema<IAdmin, AdminModelType, IAdminMethods>({
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
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: 8,
    select: false,
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
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm Password field is required'],
    validate: {
      validator: function (this: IAdmin, val: string): boolean {
        return this.password === val;
      },
    },
  },
  salt: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

schema.pre<Query<IAdmin | IAdmin[], AdminModelType>>(/^find/, function (next) {
  this.find({ active: { $ne: false } });
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

schema.method('generateResetToken', function generateResetToken(): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
});

schema.method(
  'checkIsTokenIssuedAfterPwdChanged',
  function checkIsTokenIssuedAfterPwdChanged(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const passwordChanged = Math.floor(
        this.passwordChangedAt.getTime() / 1000,
      );

      return passwordChanged > JWTTimestamp;
    }
    return false;
  },
);

const Admin = mongoose.model<IAdmin, AdminModelType>('Admin', schema);
export default Admin;
