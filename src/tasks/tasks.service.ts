import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    query.where({ user });

    if (status) query.andWhere('task.status = :status', { status });
    if (search)
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE(:search))',
        { search: `%${search}%` },
      );

    const tasks = await query.getMany();

    return tasks;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const deleted = await this.tasksRepository.delete({ id, user });
    if (deleted.affected === 0)
      throw new NotFoundException(`Task with id ${id} not found`);
  }

  async createTask(createTaskDto: CreateTaskDto, user): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.tasksRepository.save(task);

    return task;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: { id, user },
    });
    if (!found) throw new NotFoundException(`Task with id ${id} not found`);

    return found;
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    return await this.tasksRepository.save(task);
  }
}
