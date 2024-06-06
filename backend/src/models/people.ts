import mongoose, { Types, Model, Query, Document } from 'mongoose';
import validator from 'validator';
import AppErrorHandler from '../handlers/errors/appErrorHandler';

interface IPeople {
  firstName: string;
  lastName: string;
  createdBy: Types.ObjectId;
  tenantId: Types.ObjectId;
  createdAt: Date;
  company?: Types.ObjectId;
  country?: string;
  phone?: string;
  email?: string;
  isClient?: boolean;
}

type PeopleModelType = Model<IPeople>;

const schema = new mongoose.Schema<IPeople, PeopleModelType>(
  {
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
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    createdAt: { type: Date, default: Date.now() },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
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
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a correct email'],
    },
    isClient: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

schema.pre<Query<IPeople | IPeople[], PeopleModelType>>(
  'findOneAndDelete',
  async function (next) {
    try {
      const peopleDoc = await this.model.findOne(this.getQuery());
      if (peopleDoc && peopleDoc.isClient)
        throw new AppErrorHandler(
          'Cannot delete people that is attached to a client',
          400,
        );
      throw new AppErrorHandler('This referenced people is not found', 404);
    } catch (error) {
      throw error;
    }
    next();
  },
);

schema.plugin(require('mongoose-autopopulate'));

const People = mongoose.model<IPeople, PeopleModelType>('People', schema);
export default People;
