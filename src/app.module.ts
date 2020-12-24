import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { LessonResolver } from './lesson/lesson.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonService } from './lesson/lesson.service';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';
import { StudentResolver } from './student/student.resolver';
import { StudentService } from './student/student.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // url: 'mongodb+srv://user:user@cluster0.c1fbu.mongodb.net/test',
      host:'localhost',
      port: 27017,
      synchronize: true, // TODO: disable at production
      useUnifiedTopology: true,
      entities: [
        Lesson,
        Student
      ]
    }),
    LessonModule,
    StudentModule,
  ],
  providers: [
    LessonResolver,
    LessonService,
    StudentResolver,
    StudentService
  ],
})
export class AppModule {}
