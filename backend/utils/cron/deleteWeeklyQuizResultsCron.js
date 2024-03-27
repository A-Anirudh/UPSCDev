import cron from 'node-cron';
import { weeklyQuizSolution } from '../../models/gamify/quizModel.js';

const deleteWeeklyQuizPrevData = () => {
  cron.schedule('0 0 * * 2', async () => {
    try {
      // Using Mongoose to find and delete accounts deactivated for more than 30 days
      const result = await weeklyQuizSolution.deleteMany({});

      console.log(`${result.deletedCount} solutions deleted`);
    } catch (error) {
      console.error('Error deleting solutions from data', error);
    }
  });
};

export default deleteWeeklyQuizPrevData;