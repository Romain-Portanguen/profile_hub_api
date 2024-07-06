import sequelize from '../config/database';
import User from '../models/user.model';
import { generateUsers } from '../utils/generate-user.utils';
import logger from '../utils/logger.utils';
import cliProgress from 'cli-progress';


const seedDatabase = async (numUsers: number) => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized.');

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(numUsers, 0);

    const users = await generateUsers(numUsers, progressBar);
    await User.bulkCreate(users);

    progressBar.stop();
    logger.info(`Database seeded successfully with ${numUsers} users`);
  } catch (error) {
    logger.error('Error seeding the database: ', error);
  } finally {
    await sequelize.close();
  }
};

const numUsers = parseInt(process.argv[2], 10) || 10;
seedDatabase(numUsers);
