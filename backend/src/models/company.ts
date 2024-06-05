import mongoose, { Types, Model, Query, Document } from 'mongoose';
import validator from 'validator';
import { ModelsEnum } from '../utils/Constants';

interface ICompany {
  active: boolean;
  name: string;
  email: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  contact?: Types.ObjectId;
  country?: string;
  phone?: string;
  website?: string;
}

type CompanyModelType = Model<ICompany>;

const schema = new mongoose.Schema<ICompany, CompanyModelType>({
  active: { type: Boolean, default: true, select: false },
  name: {
    type: String,
    required: [true, 'Name field is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a correct email'],
    required: [true, 'Email field is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsEnum.Admin,
    required: [true, 'Created by field is required'],
    immutable: true,
  },
  createdAt: { type: Date, default: Date.now() },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: ModelsEnum.People },
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
  website: {
    type: String,
    validate: function (val: string) {
      return validator.isURL(val, {
        protocols: ['http', 'https'],
        require_protocol: true,
      });
    },
    message: 'Please Provide a valid URL',
  },
});

schema.pre<Query<ICompany | ICompany[], CompanyModelType>>(
  /^find/,
  function (next) {
    this.find({ active: { $ne: false } });
    next();
  },
);

const Company = mongoose.model<ICompany, CompanyModelType>(
  ModelsEnum.Company,
  schema,
);
export default Company;
