import mongoose, { Types, Model, Query, Document } from 'mongoose';
import { ClientType, ModelsEnum } from '../utils/Constants';
import AppErrorHandler from '../handlers/errors/appErrorHandler';

interface IClient {
  active: boolean;
  name: string;
  type: ClientType;
  company?: Types.ObjectId;
  people?: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

type ClientModelType = Model<IClient>;

const schema = new mongoose.Schema<IClient, ClientModelType>({
  active: { type: Boolean, default: true, select: false },
  type: {
    type: String,
    required: [true, 'Type field is required'],
    enum: ClientType,
    default: ClientType.company,
  },
  name: {
    type: String,
    required: [true, 'Name filed is required'],
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: ModelsEnum.Company,
    autopopulate: true,
  },
  people: {
    type: mongoose.Schema.ObjectId,
    ref: ModelsEnum.People,
    autopopulate: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsEnum.Admin,
    required: [true, 'Created by field is required'],
    immutable: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

// Check for references existence. and set the correct client name.
schema.pre<IClient>('save', async function (next) {
  try {
    if (this.type === ClientType.company) {
      const company = await mongoose
        .model(ModelsEnum.Company)
        .findById(this.company);
      if (company) {
        this.name = company.name;
      } else {
        next(new AppErrorHandler('Referenced company not found', 404));
      }
    } else if (this.type === ClientType.people) {
      const people = await mongoose
        .model(ModelsEnum.People)
        .findById(this.people);
      if (people) {
        this.name = people.fullName;
      } else {
        next(new AppErrorHandler('Referenced people not found', 404));
      }
    }
  } catch (error) {
    throw error;
  }
  next();
});

// Set isClient to true after client is saved
schema.post<IClient>('save', async function (next) {
  try {
    if (this.type === ClientType.company) {
      const company = await mongoose
        .model(ModelsEnum.Company)
        .findByIdAndUpdate(this.company, { isClient: true });
      if (!company) {
        throw new AppErrorHandler('Referenced company not found', 404);
      }
    } else if (this.type === ClientType.people) {
      const people = await mongoose
        .model(ModelsEnum.People)
        .findByIdAndUpdate(this.people, { isClient: true });
      if (!people) {
        throw new AppErrorHandler('Referenced people not found', 404);
      }
    }
  } catch (error) {
    throw error;
  }
});

// User can't update a client once is created
schema.pre<Query<IClient | IClient[], ClientModelType>>(
  'findOneAndUpdate',
  async function (next) {
    return next(
      new AppErrorHandler('You can not update a client once is created', 200),
    );
  },
);

// When a client is deleted we should set its referenced people/company isClient to false
schema.pre<Query<IClient | IClient[], ClientModelType>>(
  'findOneAndDelete',
  async function (next) {
    try {
      const clientDoc = await this.model.findOne(this.getQuery());
      if (!clientDoc) {
        throw new AppErrorHandler('Client not found', 404);
      }

      if (clientDoc.type === ClientType.company) {
        await mongoose
          .model(ModelsEnum.Company)
          .findByIdAndUpdate(clientDoc.company, { isClient: false });
      } else if (clientDoc.type === ClientType.people) {
        await mongoose
          .model(ModelsEnum.People)
          .findByIdAndUpdate(clientDoc.people, { isClient: false });
      }
    } catch (error) {
      throw error;
    }
    next();
  },
);

schema.plugin(require('mongoose-autopopulate'));

const Client = mongoose.model<IClient, ClientModelType>(
  ModelsEnum.Client,
  schema,
);
export default Client;
