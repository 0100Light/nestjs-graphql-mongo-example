import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AddStudentsToLessonInput } from './addStudentsToLesson.input';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver{
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {
  }

  @Query(returns => LessonType)
  lesson(
    @Args('id') id: string
  ){
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  lessons(){
    return this.lessonService.getLessons();
  }

  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ){
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns => LessonType)
  addStudentsToLesson(
    @Args('addStudentsToLessonInput') addStudentsToLessonInput: AddStudentsToLessonInput,
  ){
    const { lessonId, studentIds } = addStudentsToLessonInput;
    return this.lessonService.addStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson){
    console.log(lesson.students);
    const students = this.studentService.getStudentsByIds(lesson.students);
    console.log(await students);
    return students;
  }
}
