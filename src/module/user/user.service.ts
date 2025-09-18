import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 
  async create(createUserDto: CreateUserDto) {
     try {
      // Hash password before saving to database using bcrypt 
      const hashedPassword = await this.hashPassword(createUserDto);
      
      // Create new user with hashed password
      const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    
      // Save user to database
      return this.userRepository.save(user);

     } catch (error) {
       console.error('Error creating user:', error);
      // handle all Internal Server Errors (HTTP 500) 
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // Hash password using bcrypt
  private async hashPassword(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    return hashedPassword;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
