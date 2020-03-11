import { Connection } from 'mongoose';
import { ChatSchema } from 'src/database/schemas/chat.schema';

export const chatsProviders = [
  {
    provide: 'CHAT_MODEL',
    useFactory: (connection: Connection) => connection.model('CHAT', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
