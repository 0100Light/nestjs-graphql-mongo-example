import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver{
  constructor(private service: StudentService) {
  }
  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput){
    return this.service.createStudent(createStudentInput);
  }

  @Query(() => StudentType)
  student(
    @Args('id') id: string
  ){
    return this.service.getStudent(id);
  }

  @Query(() => [StudentType])
  students(){
    return this.service.getAllStudents();
  }
}
