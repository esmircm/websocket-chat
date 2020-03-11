import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    public users: number = 0;

    public async handleConnection(): Promise<void> {

        this.users++;
        this.server.emit('users', this.users);
    }

    public async handleDisconnect(): Promise<void> {

        this.users--;
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('chat')
    public async onChat(client: Socket, message: string) {

        client.broadcast.emit('chat', message);
    }

}
