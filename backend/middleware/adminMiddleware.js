const isAdmin = (req, res, next) => {
    const role = req.user.role;
    if (role === 'admin') {
      next();
    } else {
      res.status(403);
      throw new Error('Permission denied!');
    }
  };

export default isAdmin;



// adminAccountControllerAllFunctions
// Add, update and delete affairs and events
// Customer support
// Report bugs
// Quizzes
// Email