import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getUnixTime } from 'date-fns';
import { Role } from 'src/auth/role.enum';
import { AdminRepository } from './admins.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    private readonly repo: AdminRepository,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginAdminDto){
    const user = await this.repo.findOne({ email: body.email });
    if (user && user.password === body.password) {
      const payload = { email: user.email, id: user.id, role: Role.Admin };
      return {'access_token': this.jwtService.sign(payload), 'expired': getUnixTime(new Date()) + 86400};
    }
    throw new HttpException("Credenciales Invalidas", 401);
  }

  async create(body: CreateAdminDto){
    let admin = await this.repo.findOne({ email: body.email });
    if(admin){
      throw new HttpException("El usuario ya existe", 400);
    }
    admin = this.repo.create(body);
    await this.repo.persistAndFlush(admin);
    return admin;
  }
}
