import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {format} from 'date-fns';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/posts/schemas/posts.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel:Model<CommentDocument>,
    @InjectModel(Post.name) private postModel:Model<PostDocument>
  ) {}
  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm:ss');  // Standard SQL format
  }

  async create(postId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post #${postId} not found`);
    }

    const result = new this.commentModel({
      ...createCommentDto,
      postId,
      created_at: this.formatDate(new Date()),
      last_updated_at: this.formatDate(new Date())
    });
    return result.save();
  }

  async findAll(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).exec();
  }

  async findOne(commentId: string, postId: string) : Promise<Comment> {
    return this.commentModel.findOne({ _id: commentId, postId }).exec();
  }

  async update(commentId: string, postId: string, userId: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post #${postId} not found`);
    }

    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment #${commentId} not found`);
    }
    if (comment.createdBy !== userId) {
      throw new UnauthorizedException('You are not the author of this post');
    }
    comment.message = updateCommentDto.message || comment.message;
    comment.last_updated_at = this.formatDate(new Date());
    return comment.save();
  }

  async remove(commentId: string, postId: string, userId: string): Promise<{ message: string }> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    const comment = await this.commentModel.findById(commentId).exec();
    
    if (!comment) {
      throw new NotFoundException(`Comment #${commentId} not found`);
    }
  
    if (comment.createdBy !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this comment');
    }
  
    await this.commentModel.findByIdAndDelete(commentId).exec();
  
    return { message: `Comment #${commentId} deleted successfully` };
  }

}
