import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './student.input';
import { EntityManager } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(private manager: EntityManager) {
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<Student>{
    const {firstName, lastName} = createStudentInput;

    const student = this.manager.create(Student, {
      id: uuid(),
      firstName,
      lastName
    });

    return this.manager.save(student);
  }

  async getStudent(id: string): Promise<Student>{
    return this.manager.findOne(Student, {id: id});
  }

  async getAllStudents(): Promise<Student[]>{
    return this.manager.find(Student);
  }

  async getStudentsByIds(studentIds: string[]): Promise<Student[]>{
    const students = this.manager.find(Student, {
      where: {
        id: { $in: studentIds }
      }
    })
    return students;
  }
}
