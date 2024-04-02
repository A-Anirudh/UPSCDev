import express from "express";
import { addAffair, addEvent, deleteAffair, deleteEvent, updateAffair, updateEvent,eventsOfOneAffair, getOneAffair, getOneEvent, getLatestAffairs, subjectWiseHomePage, currentAffairsSubjectWise, allDataForSubject, allData,searchAffairs,searchAffairsAll} from "../controllers/affairsController.js";
import { protect,protectPublic } from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";
const affairsRoute = express.Router();

// home page
affairsRoute.get('/nonCA/subwise',protectPublic,subjectWiseHomePage);
affairsRoute.get('/CA/latest?:number',protectPublic,getLatestAffairs);
affairsRoute.get('/allPerSubject',protectPublic,allDataForSubject);
affairsRoute.get('/all',protectPublic,allData);
affairsRoute.get('/search',protect,searchAffairs);
affairsRoute.get('/search/all',protect,searchAffairsAll);

// Current affair details page
affairsRoute.get('/CA/subwise',protectPublic, currentAffairsSubjectWise)
affairsRoute.post('/new', protect,isAdmin,addAffair);
affairsRoute.put('/update',protect,isAdmin, updateAffair);

affairsRoute.get('/:id',protectPublic, getOneAffair);
affairsRoute.route('/delete').delete(protect,isAdmin,deleteAffair)

// Events routes

const eventRoute = express.Router();

eventRoute.post('/new', protect,isAdmin,addEvent);
eventRoute.put('/update',protect,isAdmin, updateEvent);
eventRoute.get('/all/:affairId',protectPublic, eventsOfOneAffair);
eventRoute.get('/:pid',protectPublic, getOneEvent);
eventRoute.route('/delete').delete(protect,isAdmin,deleteEvent)

export {affairsRoute,eventRoute};