import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Chat } from './interfaces/chat.interface';
import { CreateChatDto } from './dto/create-chat-dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(private readonly chatService: ChatService) { }

    @WebSocketServer() server: Server;
    public users: number = 0;

    public async handleConnection(): Promise<void> {

        this.users++;
        this.server.emit('users', this.users);

        const messages: Chat[] = await this.chatService.findAll();
        this.server.emit('chat', messages);
    }

    public async handleDisconnect(): Promise<void> {

        this.users--;
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('chat')
    public async onChat(client: Socket, message: CreateChatDto) {

        await this.chatService.create(message);
        const messages: Chat[] = await this.chatService.findAll();

        client.broadcast.emit('chat', messages);
    }

}
