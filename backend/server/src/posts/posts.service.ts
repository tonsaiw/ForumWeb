import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as postsData from '../mockData/posts.json';
import {format} from 'date-fns';

@Injectable()
export class PostsService {
  private posts = postsData;
  private nextId = this.posts.length + 1;
  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm:ss');  // Standard SQL format
  }
  
  create(createPostDto: CreatePostDto) {
    const newPost = {
      id: this.nextId,
      ...createPostDto,
      date: this.formatDate(new Date()),
    };
    this.posts.push(newPost);
    this.nextId++;
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }
  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.findOne(id);
    Object.assign(post, updatePostDto);
    post.datetime = this.formatDate(new Date());
    return post;
  }

  remove(id: number) {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
  }
}
