import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as postsData from '../mockData/posts.json';

@Injectable()
export class PostsService {
  private posts = postsData;
  create(createPostDto: CreatePostDto) {
    const newPost = {
      id: this.posts.length + 1,
      ...createPostDto,
      date: new Date().toISOString(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  // This method is used to get the posts data from the JSON file
}
