import asyncHandler from "express-async-handler";
import { Affair, Event } from "../models/affairsModel.js";
import { v4 as uuidv4 } from "uuid";
import NodeCache from "node-cache";
import { JSDOM } from "jsdom";
import dompurify from "dompurify";
import TextToSpeechConvert from "../utils/tts.js";

const nodeCache = new NodeCache();

// Search affair

const searchAffairs = asyncHandler(async (req, res) => {
  const {  subject } = req.query;
  const query = {};
  let results = [];
  if (subject) {
    query.$or = [
      { affairName: { $regex: subject, $options: 'i' } }, // Match partial words in affairName
      { summary: { $regex: subject, $options: 'i' } },     // Match partial words in summary
      { subject: { $regex: subject, $options: 'i' }}
    ];
  }

  if(Object.keys(query).length) {
    results = await Affair.find(query).select('affairName id subject').exec();
  }


  if(results.length>0){
    res.status(200).json(results);
  } else{
    res.status(404)
    throw new Error('No results!')
  }
});

const searchAffairsAll = asyncHandler(async (req, res) => {
  const {  subject } = req.query;

  const query = {};
  let results = [];

  if (subject) {
    query.$or = [
      { affairName: { $regex: subject, $options: 'i' } }, // Match partial words in affairName
      { summary: { $regex: subject, $options: 'i' } },     // Match partial words in summary
      { subject: { $regex: subject, $options: 'i' }}
    ];
  }

  if(Object.keys(query).length) {
    results = await Affair.find(query).select('affairName id thumbnail pid subject').exec();
  }

  if(results.length>0){
    res.status(200).json(results);
  } else{
    res.status(404)
    throw new Error('No results!')
  }
});


const allData = asyncHandler(async (req, res) => {
  const allData = await Affair.find({}).sort({ createdAt: -1 });
  if (allData.length > 0) {
    res.status(200).json({
      data: allData,
    });
  } else {
    res.status(404);
    throw new Error("No data found!");
  }
});

// Subject wise "not current affairs".. its for theory for all subjects except CSAT
const subjectWiseHomePage = asyncHandler(async (req, res) => {
  let subjectWiseData = {};
  if (nodeCache.has("subjectDataTop20")) {
    subjectWiseData = JSON.parse(nodeCache.get("subjectDataTop20"));
  } else {
    // Query the database for distinct subjects

    const subjects = await Affair.distinct("subject");

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found." });
    }

    // Create an array of promises to fetch data for each subject
    const subjectDataPromises = subjects.map((subject) =>
      Affair.find({ subject: subject, isCurrentAffair: false })
        .sort({ createdAt: -1 })
        .limit(Number(20))
        .select("pid id thumbnail tags affairName subject isCurrentAffair")
    );

    // Execute all promises concurrently
    const subjectDataArray = await Promise.all(subjectDataPromises);

    // Combine subjects and their respective data into an object
    // Passing data only if atleast 1 article exists
    subjects.forEach((subject, index) => {
      if (subjectDataArray[index].length > 0) {
        subjectWiseData[subject] = subjectDataArray[index];
      }
    });

    nodeCache.set("subjectDataTop20", JSON.stringify(subjectWiseData));
  }

  // Return the subject-wise data
  res.status(200).json({
    subjectWiseData,
  });
});

// CA for home page
const getLatestAffairs = asyncHandler(async (req, res) => {
  let affairs;
  const number = req.query.number || 20;
  if (nodeCache.has("homeAffairs")) {
    affairs = JSON.parse(nodeCache.get("homeAffairs"));
  } else {
    affairs = await Affair.find({ isCurrentAffair: true })
      .sort({ createdAt: -1 })
      .limit(Number(number))
      .select("pid id thumbnail tags affairName subject isCurrentAffair");

    nodeCache.set("homeAffairs", JSON.stringify(affairs));
  }

  if (affairs) {
    res.status(200).json({
      data: affairs,
    });
  } else {
    res.status(400);
    throw new Error("Affairs not found. Please try again later");
  }
});

// subject wise for current affairs
const currentAffairsSubjectWise = asyncHandler(async (req, res) => {
  let subjectWiseData = {};
  if (nodeCache.has("subjectWiseAffairs")) {
    subjectWiseData = JSON.parse(nodeCache.get("subjectWiseAffairs"));
  } else {
    // Query the database for distinct subjects

    const subjects = await Affair.distinct("subject");

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found." });
    }

    // Create an array of promises to fetch data for each subject
    const subjectDataPromises = subjects.map((subject) =>
      Affair.find({ subject: subject, isCurrentAffair: true })
        .sort({ createdAt: -1 })
        .limit(Number(20))
        .select("pid id thumbnail tags affairName subject isCurrentAffair")
    );

    // Execute all promises concurrently
    const subjectDataArray = await Promise.all(subjectDataPromises);

    // Combine subjects and their respective data into an object
    subjects.forEach((subject, index) => {
      if (subjectDataArray[index].length > 0) {
        subjectWiseData[subject] = subjectDataArray[index];
      }
    });

    nodeCache.set("subjectWiseAffairs", JSON.stringify(subjectWiseData));
  }

  // Return the subject-wise data
  res.status(200).json({
    subjectWiseData,
  });
});

// All per subject
const allDataForSubject = asyncHandler(async (req, res) => {
  const subject = req.query.subject;
  const ca = req.query.currentAffair;

  console.log("this is subject:", subject);
  console.log(typeof ca);
  if (ca !== "true" && ca !== "false") {
    return res
      .status(400)
      .json({
        error:
          'Invalid value for currentAffair. It must be either "true" or "false".',
      });
  }

  const isCurrentAffair = ca === "true";

  const allDataPerSubject = await Affair.find({
    subject: subject,
    isCurrentAffair: isCurrentAffair,
  });

  if (allDataPerSubject.length > 0) {
    return res.status(200).json({ allDataPerSubject });
  } else {
    return res
      .status(404)
      .json({
        error:
          "No data found for the specified subject and current affair status.",
      });
  }
});

const getOneAffair = asyncHandler(async (req,res) => {
    const id = req.params.id;
    let aff;
    const cookie = req.cookies.jwt
    if(cookie){
        if(req?.user?.role === 'admin'){
            aff = await Affair.find({_id:id})
        } else{
            if(req?.user?.subscription?.status !== 'active'){
                aff = await Affair.find({_id:id}).select('-summary -audio')
        
            } else{
                aff = await Affair.find({_id:id})
            }
        }
        }
        else{
        aff = await Affair.find({_id:id}).select('-summary -audio')
        }
    
    if(aff.length!=0){
        res.status(200).json({
            "data":aff
        })
    } else{
        res.status(400)
        throw new Error('Affair not found!')
    }
})


const addAffair = asyncHandler(async (req, res) => {
    const {
      affairName,
      summary,
      article,
      tags,
      startDate,
      endDate,
      thumbnail,
      thumbnail_small,
      subject,
      isCurrentAffair,
    } = req.body;

    const window = new JSDOM("").window;
    const DOMPurify = dompurify(window);

    // Sanitize HTML content before storing it
    const sanitizedHTML = DOMPurify.sanitize(article);
    let audio;

    const affair = await Affair.create({
      pid: uuidv4(),
      affairName,
      summary,
      article: sanitizedHTML,
      tags,
      startDate,
      endDate,
      thumbnail: thumbnail,
      thumbnail_small,
      subject,
      isCurrentAffair,
    });
    if (affair) {
      await TextToSpeechConvert(sanitizedHTML)
        .then((uploadResult) => {
          audio = uploadResult.secure_url;
          affair.audio = audio;
          affair.save();
        })
        .catch((error) => {
          throw new Error(error);
        });
      // nodeCache.del('latestAffairs');
      nodeCache.del("homeAffairs");
      nodeCache.del("subjectDataTop20");
      res.status(201).json({
        pid: affair.pid,
        affairName: affair.affairName,
      });
    } else {
      res.status(400);
      throw new Error("Invalid data entered!");
    }
  
});

const updateAffair = asyncHandler(async (req, res) => {

    const { pid } = req.body;
    const affair = await Affair.findOne({ pid: pid });

    if (affair) {
      affair.affairName = req.body.affairName || affair.affairName;
      affair.summary = req.body.summary || affair.summary;
      affair.article = req.body.article || affair.article;
      affair.tags = req.body.tags || affair.tags;
      affair.startDate = req.body.startDate || affair.startDate;
      affair.endDate = req.body.endDate || affair.endDate;
      affair.thumbnail = req.body.thumbnail || affair.thumbnail;
      affair.thumbnail_small =
        req.body.thumbnail_small || affair.thumbnail_small;
      affair.subject = req.body.subject || affair.subject;
      affair.isCurrentAffair =
        req.body.isCurrentAffair || affair.isCurrentAffair;

      const updatedAffair = await affair.save();
      // nodeCache.del('latestAffairs');
      nodeCache.del("homeAffairs");
      nodeCache.del("subjectDataTop20");

      res.status(200).json({
        pid: updatedAffair.pid,
        affairName: updatedAffair.affairName,
      });
    } else {
      res.status(404);
      throw new Error("Current Affair not found");
    }
});

const deleteAffair = asyncHandler(async (req, res) => {

    const { pid } = req.body;

    const affair = await Affair.findOne({ pid: pid });

    const affairId = affair._id;
    if (affair) {
      await Event.deleteMany({ affairId: affairId });
      await Affair.deleteOne({ pid: pid });
      nodeCache.del("homeAffairs");
      nodeCache.del("subjectDataTop20");
      res.status(201).json({
        message: "deleted successfully",
        pid,
      });
    } else {
      res.status(400);
      throw new Error("Current Affair not found!");
    }
});

// Events controller from here

const addEvent = asyncHandler(async (req, res) => {
    const { eventName, desc, affairId, startDate, endDate } = req.body;
    const event = await Event.create({
      pid: uuidv4(),
      eventName,
      desc,
      affairId,
      startDate,
      endDate,
    });
    if (event) {
      res.status(201).json({
        pid: event.pid,
        eventName: event.eventName,
      });
    } else {
      res.status(400);
      throw new Error("Invalid data entered!");
    }
});

const getOneEvent = asyncHandler(async (req, res) => {
  const pid = req.params.pid;
  const event = await Event.findOne({ pid: pid }).select(
    "-createdAt -updatedAt -pid"
  );

  if (event.length != 0) {
    res.status(200).json({
      data: event,
    });
  } else {
    res.status(400);
    throw new Error("Event not found!");
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
    const { pid } = req.body;
    const event = await Event.findOne({ pid: pid });
    if (event) {
      await Event.deleteOne({ pid: pid });
      res.status(201).json({
        message: "deleted successfully",
        pid,
      });
    } else {
      res.status(400);
      throw new Error("Event not found!");
    }
});

const updateEvent = asyncHandler(async (req, res) => {
    const { pid } = req.body;
    const event = await Event.findOne({ pid: pid });

    if (event) {
      event.eventName = req.body.eventName || event.eventName;
      event.desc = req.body.desc || event.desc;
      event.affairId = req.body.affairId || event.affairId;
      event.startDate = req.body.startDate || event.startDate;
      event.endDate = req.body.endDate || event.endDate;
      const updatedEvent = await event.save();
      res.status(200).json({
        pid: updatedEvent.pid,
        eventName: updatedEvent.eventName,
      });
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
});

const eventsOfOneAffair = asyncHandler(async (req, res) => {
  const affairId = req.params.affairId;
  const events = await Event.find({ affairId: affairId }).select(
    "eventName startDate pid id"
  );
  if (events.length != 0) {
    res.status(200).json({
      data: events,
    });
  } else {
    res.status(404);
    throw new Error("No events for this affair");
  }
});

const testData = {
  affairName: "Sample Affair",
  summary: "This is a sample affair for testing purposes.",
  article:
    "<p>This is a sample article with <strong>bold</strong> and <em>italic</em> text.</p><img src='https://example.com/image.jpg' alt='Sample Image'><a href='https://example.com'>Visit Example.com</a>",
  tags: ["sample", "test", "demo"],
  startDate: "2023-01-01",
  endDate: "2023-01-10",
};

export {
  getOneAffair,
  addAffair,
  deleteAffair,
  updateAffair,
  getLatestAffairs,
  addEvent,
  deleteEvent,
  updateEvent,
  eventsOfOneAffair,
  getOneEvent,
  subjectWiseHomePage,
  currentAffairsSubjectWise,
  allDataForSubject,
  allData,
  searchAffairs,
  searchAffairsAll
};
