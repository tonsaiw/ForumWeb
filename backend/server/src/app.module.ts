import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

// Set up the ConfigModule and MongooseModule

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  })
    ,MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        user: configService.get<string>('MONGO_USER'),
        pass: configService.get<string>('MONGO_PASSWORD'),
        dbName: configService.get<string>('MONGO_DB_NAME'),
      }),
    }), PostsModule, UserModule, AuthModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
