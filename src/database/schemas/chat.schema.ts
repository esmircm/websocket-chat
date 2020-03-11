import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  message: String,
});
