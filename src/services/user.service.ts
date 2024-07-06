import User, { UserCreationAttributes, UserAttributes } from '../models/user.model';
import { UserDto, CreateUserDto, UpdateUserDto, PaginatedUsersDto } from '../dtos/user.dto';

class UserService {
  async createUser(userData: CreateUserDto): Promise<UserDto> {
    const user = await User.create(userData as UserCreationAttributes);
    return user.toJSON() as UserDto;
  }

  async getUsers(page: number, limit: number): Promise<PaginatedUsersDto> {
    const offset = (page - 1) * limit;
    const { rows, count } = await User.findAndCountAll({ offset, limit });
    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users: rows.map(user => user.toJSON() as UserDto),
    };
  }

  async getUserById(id: string): Promise<UserDto | null> {
    const user = await User.findByPk(id);
    return user ? (user.toJSON() as UserDto) : null;
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<UserDto | null> {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(updateData);
      return user.toJSON() as UserDto;
    }
    return null;
  }

  async deleteUser(id: string): Promise<UserDto | null> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return user.toJSON() as UserDto;
    }
    return null;
  }
}

export default new UserService();
