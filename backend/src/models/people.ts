import mongoose, { Types, Model, Query, Document } from 'mongoose';
import validator from 'validator';

interface IPeople {
  active: boolean;
  firstName: string;
  lastName: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  company?: Types.ObjectId;
  country?: string;
  phone?: string;
  email?: string;
}

type PeopleModelType = Model<IPeople>;

const schema = new mongoose.Schema<IPeople, PeopleModelType>({
  active: { type: Boolean, default: true, select: false },
  firstName: {
    type: String,
    required: [true, 'First Name field is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name field is required'],
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: [true, 'Created by field is required'],
    immutable: true,
  },
  createdAt: { type: Date, default: Date.now() },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  country: { type: String, trim: true },
  phone: {
    type: String,
    validate: {
      validator: function (val: string) {
        return validator.isMobilePhone(val, 'any');
      },
      message: 'Please provide a valid phone number',
    },
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a correct email'],
  },
});

schema.pre<Query<IPeople | IPeople[], PeopleModelType>>(
  /^find/,
  function (next) {
    this.find({ active: { $ne: false } }).populate('company');
    next();
  },
);

const People = mongoose.model<IPeople, PeopleModelType>('People', schema);
export default People;
