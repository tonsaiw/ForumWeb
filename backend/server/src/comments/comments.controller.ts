import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req
  ) {
    createCommentDto.author = req.user.username;
    createCommentDto.createdBy = req.user.userId;
    return this.commentsService.create(postId, createCommentDto);
  }

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }

  @Get(':commentId')
  findOne(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string
  ) {
    return this.commentsService.findOne(commentId, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':commentId')
  update(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string, 
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req
  ) {
    const userId = req.user.userId;
    return this.commentsService.update(commentId, postId, userId, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  remove(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Request() req
  ) {
    const userId = req.user.userId;
    return this.commentsService.remove(commentId, postId, userId);
  }
}
