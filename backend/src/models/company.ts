import mongoose, { Types, Model, Query, Document } from 'mongoose';
import validator from 'validator';
import { ModelsEnum } from '../utils/Constants';
import AppErrorHandler from '../handlers/errors/appErrorHandler';

interface ICompany {
  name: string;
  email: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  contact?: Types.ObjectId;
  country?: string;
  phone?: string;
  website?: string;
  isClient?: boolean;
}

type CompanyModelType = Model<ICompany>;

const schema = new mongoose.Schema<ICompany, CompanyModelType>({
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
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsEnum.People,
    autopopulate: true,
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
  isClient: {
    type: Boolean,
    default: false,
  },
});

schema.pre<Query<ICompany | ICompany[], CompanyModelType>>(
  'findOneAndDelete',
  async function (next) {
    try {
      const companyDoc = await this.model.findOne(this.getQuery());
      if (companyDoc && companyDoc.isClient)
        throw new AppErrorHandler(
          'Cannot delete company that is attached to a client',
          400,
        );
      throw new AppErrorHandler('This referenced company is not found', 404);
    } catch (error) {
      throw error;
    }
    next();
  },
);

schema.plugin(require('mongoose-autopopulate'));

const Company = mongoose.model<ICompany, CompanyModelType>(
  ModelsEnum.Company,
  schema,
);
export default Company;
