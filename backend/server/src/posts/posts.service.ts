import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/posts.schema';
import * as postsData from '../mockData/posts.json';
import {format} from 'date-fns';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel:Model<PostDocument>) {}
  private posts = postsData;
  private nextId = this.posts.length + 1;
  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm:ss');  // Standard SQL format
  }
  
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const result = new this.postModel(createPostDto);
    return result.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string) : Promise<Post> {
    return this.postModel.findById(id).exec();
  }
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const result = this.postModel.findByIdAndUpdate(id, updatePostDto, {new: true}).exec();
    return result;
  }

  async remove(id: string){
    const result = await this.postModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return {message: `Post #${id} deleted`};
  }
}
