import User, { UserCreationAttributes } from '../models/user.model';
import { CreateUserDto, UserDto } from '../dtos/user.dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  async register(userData: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData as UserCreationAttributes,
      password: hashedPassword,
    });
    return user.toJSON() as UserDto;
  }

  async login(credentials: { email: CreateUserDto["email"]; password: CreateUserDto["password"]; }) {
    const user = await User.findOne({ where: { email: credentials.email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    return token;
  }
}

export default new AuthService();
