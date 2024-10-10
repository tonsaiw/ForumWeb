import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  
  @Prop()
  message: string;

  @Prop({required: true})
  author: string;

  @Prop({required: true})
    postId: string;

  @Prop({required: true})
  createdBy: string;

  @Prop({required: true})
  created_at: string;

  @Prop({required: true})
  last_updated_at: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);