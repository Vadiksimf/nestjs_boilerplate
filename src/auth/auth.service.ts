import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
import { UserRole } from './user-role.enum';
import { IJwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password, firstName, lastName } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      role: UserRole.USER,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.createUser(authCredentialsDto);
  }

  async signIn(
    signinCredentialsDto: SigninCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = signinCredentialsDto;
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  //   findAll(): Promise<User[]> {
  //     return this.usersRepository.find();
  //   }

  //   findOne(id: number): Promise<User> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

  //   async remove(id: string): Promise<void> {
  //     await this.usersRepository.delete(id);
  //   }
}
