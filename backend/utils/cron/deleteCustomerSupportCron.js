import cron from 'node-cron';
import {CustomerSupport} from '../../models/customerSupportModel.js';

const deleteSupportQueryFromDatabase = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Using Mongoose to find and delete accounts deactivated for more than 30 days
      const result = await CustomerSupport.deleteMany({ resolved: true, createdAt: { $lt: thirtyDaysAgo } });

      console.log(`${result.deletedCount} customer support queries deleted.`);
    } catch (error) {
      console.error('Error deleting customer support queries:', error);
    }
  });
};

export default deleteSupportQueryFromDatabase;