import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ValidateUser } from './dto/validateUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}
    
    // local strategy
    async validateUser(email: string, password: string): Promise<ValidateUser> {
        const user = await this.userService.findByEmail(email);
        // compare password
        if (user && (await bcrypt.compareSync(password, user.password))) {
            const result = user.toObject();
            return {
                username: result.username,
                userId: result._id,
            }
        }

        return null;
    }

    async signJwt(user: any) {
        const payload = { username: user.username, userId: user.userId.toString() };
        return this.jwtService.sign(payload);
    }
    
}
