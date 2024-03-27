// import cron from 'node-cron';
// import User from '../../models/userModel.js';

// const deleteUserFromDatabase = () => {
//   cron.schedule('0 0 * * *', async () => {
//     try {
//       const thirtyDaysAgo = new Date();
//       thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//       // Using Mongoose to find and delete accounts deactivated for more than 30 days
//       const result = await User.deleteMany({ active: false, deactivatedAt: { $lt: thirtyDaysAgo } });

//       console.log(`${result.deletedCount} deactivated accounts deleted.`);
//     } catch (error) {
//       console.error('Error deleting deactivated accounts:', error);
//     }
//   });
// };

// export default deleteUserFromDatabase;

import cron from 'node-cron';
import User from '../../models/userModel.js';
import {Favourite} from '../../models/affairsModel.js';

const deleteUserFromDatabase = () => {
  // Set up a pre-hook to delete Favourites when Users are deleted
  User.schema.pre('deleteMany', async function (next) {
    try {
      const usersToDelete = await this.model.find(this.getQuery());
      const userIDsToDelete = usersToDelete.map(user => user._id);
      
      // Remove Favourites associated with the users
      await Favourite.deleteMany({ userId: { $in: userIDsToDelete } });

      next();
    } catch (error) {
      next(error);
    }
  });

  cron.schedule('0 0 * * *', async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Using Mongoose to find and delete accounts deactivated for more than 30 days
      const result = await User.deleteMany({ active: false, deactivatedAt: { $lt: thirtyDaysAgo } });

      console.log(`${result.deletedCount} deactivated accounts deleted.`);
    } catch (error) {
      console.error('Error deleting deactivated accounts:', error);
    }
  });
};

export default deleteUserFromDatabase;