import { connect } from 'mongoose';

export const connectToDB = async (uri: string) => {
  return connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};
