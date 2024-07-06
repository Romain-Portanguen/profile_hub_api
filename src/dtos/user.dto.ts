export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  identityNumber: string;
  identityType: string;
  profilePicture?: string;
  role: 'User' | 'Admin' | 'Owner';
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  identityNumber: string;
  identityType: string;
  password: string;
  role: 'User' | 'Admin' | 'Owner';
  profilePicture?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  identityNumber?: string;
  identityType?: string;
  password?: string;
  role?: 'User' | 'Admin' | 'Owner';
  profilePicture?: string;
}

export interface PaginatedUsersDto {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  users: UserDto[];
}
