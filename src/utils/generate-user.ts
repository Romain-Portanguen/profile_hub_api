import { faker } from '@faker-js/faker';
import { generateEmail } from './generate-email';
import { UserCreationAttributes } from '../models/user';
import bcrypt from 'bcryptjs';
import cliProgress from 'cli-progress';

export const generateUsers = async (numUsers: number, progressBar: cliProgress.SingleBar): Promise<UserCreationAttributes[]> => {
  const users: UserCreationAttributes[] = [];

  for (let i = 0; i < numUsers; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = generateEmail(firstName, lastName);
    const dateOfBirth = faker.date.past({ years: 30, refDate: new Date('2002-01-01') }).toISOString().split('T')[0];
    const address = faker.location.streetAddress();
    const phoneNumber = faker.phone.number();
    const identityNumber = faker.string.alphanumeric(10).toUpperCase();
    const identityType = faker.helpers.arrayElement(['Passport', 'Driver License', 'National ID', 'Social Security Number']);
    const profilePicture = faker.image.avatar();
    const password = 'password123';
    const role: 'User' | 'Admin' | 'Owner' = faker.helpers.arrayElement(['User', 'Admin', 'Owner']) as 'User' | 'Admin' | 'Owner';

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      firstName,
      lastName,
      email,
      dateOfBirth,
      address,
      phoneNumber,
      identityNumber,
      identityType,
      profilePicture,
      password: hashedPassword,
      role,
    });

    progressBar.increment();
  }

  return users;
};