import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({required: true})
  title: string;

  @Prop()
  content: string;

  @Prop({required: true})
  author: string;

  @Prop({required: true})
  createdBy: string;

  @Prop({required: true})
  created_at: string;

  @Prop({required: true})
  last_updated_at: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);