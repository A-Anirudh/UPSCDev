import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addCustomerSupport,allSupportForAdminPanel,deleteOldSupportQueries,markAsResolved } from "../controllers/customerSupportController.js";

const customerSupportRoute = express.Router();

customerSupportRoute.post('/add',protect, addCustomerSupport);
customerSupportRoute.get('/all',protect,allSupportForAdminPanel);
customerSupportRoute.put('/update',protect,markAsResolved);
customerSupportRoute.delete('/delete',protect,deleteOldSupportQueries);

export default customerSupportRoute;