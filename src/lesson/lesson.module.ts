import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { StudentService } from '../student/student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    StudentService,
  ],
  providers: [LessonService, LessonResolver, StudentService],
})
export class LessonModule {}
