import sequelize from '../config/database';
import User from '../models/user';
import cliProgress from 'cli-progress';
import { generateUsers } from '../utils/generate-user';

const resetDatabase = async () => {
  try {
    const initialUsersValue = 2;
    const usersInDB = await User.count();
    console.log(`Number of users currently in the database: ${usersInDB}`);

    const deleteProgressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    deleteProgressBar.start(usersInDB, 0);

    for (let i = 0; i < usersInDB; i++) {
      await User.destroy({ where: {}, truncate: true });
      deleteProgressBar.increment();
    }

    deleteProgressBar.stop();
    console.log('All existing users have been deleted.');

    await sequelize.sync({ force: true });
    console.log('Database has been reset.');

    const createProgressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    createProgressBar.start(initialUsersValue, 0);

    const initialUsers = await generateUsers(initialUsersValue, createProgressBar);
    await User.bulkCreate(initialUsers);

    createProgressBar.stop();
    console.log('Initial data has been inserted.');
  } catch (error) {
    console.error('Failed to reset database:', error);
  } finally {
    await sequelize.close();
  }
};

resetDatabase();
