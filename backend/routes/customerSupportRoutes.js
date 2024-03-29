import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addCustomerSupport,allSupportForAdminPanel,deleteOldSupportQueries,markAsResolved } from "../controllers/customerSupportController.js";
import isAdmin from "../middleware/adminMiddleware.js";

const customerSupportRoute = express.Router();

customerSupportRoute.post('/add',protect, addCustomerSupport);
customerSupportRoute.get('/all',protect,isAdmin,allSupportForAdminPanel);
customerSupportRoute.put('/update',protect,isAdmin,markAsResolved);
customerSupportRoute.delete('/delete',protect,isAdmin,deleteOldSupportQueries);

export default customerSupportRoute;