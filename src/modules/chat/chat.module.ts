import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { chatsProviders } from './chat.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [ChatGateway,
                ChatService,
                ...chatsProviders,
    ],
})
export class ChatModule {}
