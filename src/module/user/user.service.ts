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
     
      // Hash password before saving to database using bcrypt 
      const hashedPassword = await this.hashPassword(createUserDto);
      
      // Create new user with hashed password
      const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    
      // Save user to database
      return this.userRepository.save(user);
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

  async findOne(id: string) {
     const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new InternalServerErrorException('User not found');

    }
   const { password: _p, ...safe } = user;
    return safe;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
