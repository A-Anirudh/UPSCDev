import cron from 'node-cron';
import {ReportBug} from '../../models/reportBugsModel.js';

const deleteReportBugsFromDatabase = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Using Mongoose to find and delete accounts deactivated for more than 30 days
      const result = await ReportBug.deleteMany({ status: 'Fixed', createdAt: { $lt: thirtyDaysAgo } });

      console.log(`${result.deletedCount} bugs deleted.`);
    } catch (error) {
      console.error('Error deleting bugs:', error);
    }
  });
};

export default deleteReportBugsFromDatabase;