import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Chat } from 'src/modules/chat/interfaces/chat.interface';
import { CreateChatDto } from './dto/create-chat-dto';

@Injectable()
export class ChatService {

  constructor(
    @Inject('CHAT_MODEL')
    private readonly chatModel: Model<Chat>,
  ) {}

  public async create(createChatDto: CreateChatDto): Promise<Chat> {
    const createdChat = new this.chatModel(createChatDto);
    return createdChat.save();
  }

  public async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }
}
