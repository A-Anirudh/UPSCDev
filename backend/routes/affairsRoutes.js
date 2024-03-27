import express from "express";
import { addAffair, addEvent, deleteAffair, deleteEvent, updateAffair, updateEvent,eventsOfOneAffair, getOneAffair, getOneEvent, getLatestAffairs, subjectWiseHomePage, currentAffairsSubjectWise, allDataForSubject, allData } from "../controllers/affairsController.js";
import { protect,protectPublic } from "../middleware/authMiddleware.js";


const affairsRoute = express.Router();

// home page
affairsRoute.get('/nonCA/subwise',protectPublic,subjectWiseHomePage);
affairsRoute.get('/CA/latest?:number',protectPublic,getLatestAffairs);
affairsRoute.get('/allPerSubject',protectPublic,allDataForSubject);
affairsRoute.get('/all',protectPublic,allData);

// Current affair details page
affairsRoute.get('/CA/subwise',protectPublic, currentAffairsSubjectWise)
affairsRoute.post('/new', protect,addAffair);
affairsRoute.put('/update',protect, updateAffair);

affairsRoute.get('/:id',protectPublic, getOneAffair);
affairsRoute.route('/delete').delete(protect,deleteAffair)

// Events routes

const eventRoute = express.Router();

eventRoute.post('/new', protect,addEvent);
eventRoute.put('/update',protect, updateEvent);
eventRoute.get('/all/:affairId',protectPublic, eventsOfOneAffair);
eventRoute.get('/:pid',protectPublic, getOneEvent);
eventRoute.route('/delete').delete(protect,deleteEvent)

export {affairsRoute,eventRoute};