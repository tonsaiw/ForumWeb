import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/posts.schema';
import {format} from 'date-fns';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel:Model<PostDocument>) {}
  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm:ss');  // Standard SQL format
  }
  
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const result = new this.postModel(createPostDto);
    result.created_at = this.formatDate(new Date());
    result.last_updated_at = this.formatDate(new Date());
    return result.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string) : Promise<Post> {
    return this.postModel.findById(id).exec();
  }
  async update(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    if (post.createdBy !== userId) {
      throw new UnauthorizedException('You are not the author of this post');
    }
    post.title = updatePostDto.title || post.title;
    post.content = updatePostDto.content || post.content;
    post.last_updated_at = this.formatDate(new Date());
    return post.save();
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const post = await this.postModel.findById(id).exec();
    
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
  
    if (post.createdBy !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this post');
    }
  
    // Delete the post if the user is authorized
    await this.postModel.findByIdAndDelete(id).exec();
  
    return { message: `Post #${id} deleted successfully` };
  }
  
}
