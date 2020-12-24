import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { EntityManager, MongoEntityManager } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    private entityManager: EntityManager,
    // private mongoManager: MongoEntityManager
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.entityManager.create(Lesson, {
      id: uuid(),
      name, startDate, endDate,
      students
    });

    return this.entityManager.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson>{
    return this.entityManager.findOne(Lesson, {id: id});
  }

  async getLessons() {
    // const lessons = this.entityManager.createQueryBuilder()
    //   .select("lessons")
    //   .from(Lesson, "lessons")
    //   .getMany();
    const lessons = this.entityManager.find(Lesson);
    return lessons;
  }

  async addStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
    const lesson = await this.entityManager.findOne(Lesson, { id: lessonId});
    lesson.students = [...lesson.students, ...studentIds];

    return this.entityManager.save(lesson);
  }
}
