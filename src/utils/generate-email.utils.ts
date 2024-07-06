import { faker } from '@faker-js/faker';

export const generateEmail = (firstName: string, lastName: string): string => {
  const domain = faker.internet.domainName();
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
};