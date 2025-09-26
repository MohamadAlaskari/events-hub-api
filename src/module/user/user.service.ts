import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      const hashedPassword = await this.hashPassword(createUserDto.password);
      
      // Create new user with hashed password
      const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    
      // Save user to database
      return this.userRepository.save(user);
  }

  // Hash password using bcrypt
  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }


  async findOne(id: string) {
     const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');

    }
   const { password: _p , ...safe } = user;
    return safe;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    await this.userRepository.update(id, updateUserDto);

    const updatedUser = await this.userRepository.findOne({ where: { id } });
    const { password, ...safeUser } = updatedUser!;
    return safeUser;
  }
    

  async remove(id: string) {
    const removeduser = await this.userRepository.delete(id);
    if(removeduser.affected === 0) throw new NotFoundException('User not found');
    
    return {message: 'User deleted successfully'};
  }


  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
