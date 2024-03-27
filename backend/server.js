import express from 'express'
import dotenv from 'dotenv';
import router from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Routes
import {affairsRoute,eventRoute} from './routes/affairsRoutes.js';
import adminRoute from './routes/adminRoutes.js';
import favouriteRoute from './routes/favoriteRoutes.js';
import verifyRoute from './routes/verifyRoutes.js';
import paymentRoute from './routes/paymentRoutes.js';
import expressRateLimit from 'express-rate-limit';
import emailRoute from './routes/emailRoutes.js';
import quizRoute from './routes/quizRoutes.js';
import reportBugsRoute from './routes/reportBugsRoutes.js';
import DailyQuizRoute from './routes/dailyQuizRoute.js';
import customerSupportRoute from './routes/customerSupportRoutes.js';

// payment
import RazorPay from 'razorpay';
import deleteReportBugsFromDatabase from './utils/cron/deleteBugsCron.js';
import deleteSupportQueryFromDatabase from './utils/cron/deleteCustomerSupportCron.js';
import deleteUserFromDatabase from './utils/cron/deleteUserCron.js';
import userAdminRoute from './routes/userAdminRoutes.js';
import badgeRoute from './routes/gamify/badgesRoutes.js';
import weeklyQuestionsRoute from './routes/gamify/weeklyQuizRoutes.js';
import deleteWeeklyQuizPrevData from './utils/cron/deleteWeeklyQuizResultsCron.js';
import PlaylistRoute from './routes/playlist/playlistRoutes.js';
import ClipRoute from './routes/clips/clipsRoute.js';



dotenv.config();

connectDB();
const port = process.env.PORT || 8080;
const app = express()
app.use(cors({ origin: '*', credentials: true }));

app.set('trust proxy', 1);
// Limit 250 requests per minute per IP address
app.use(expressRateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 250, // maximum requests per window
    message: 'Too many requests, please try again later',
  }));
  
// app.use(bodyParser.json({limit:"50mb"}))

app.use(express.urlencoded({extended: true})); // Allows to send form data. If I don't add this, I won't be able to send data..

app.use(express.json()); // this makes req.body available.. else body won't be available
app.use(cookieParser());


// API routes only
app.use('/api/users',router)
app.use('/api/affairs',affairsRoute)
app.use('/api/admin',adminRoute)
app.use('/api/events',eventRoute)
app.use('/api/favourites',favouriteRoute)
app.use('/users',verifyRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/email',emailRoute)
app.use('/api/quiz',quizRoute)
app.use('/api/dailyQuiz',DailyQuizRoute)
app.use('/api/bug',reportBugsRoute)
app.use('/api/support',customerSupportRoute)
app.use('/api/admin/users',userAdminRoute)
app.use('/api/gamify',badgeRoute)
app.use('/api/gamify',weeklyQuestionsRoute)
app.use('/api/playlist',PlaylistRoute)
app.use('/api/clip',ClipRoute)

// Middleware
app.use(notFound);
app.use(errorHandler);
app.listen(port, () =>{
    console.log(`server is ready and running on port ${port}`)
})


// cron jobs functions called here
deleteReportBugsFromDatabase();
deleteSupportQueryFromDatabase();
deleteUserFromDatabase();
deleteWeeklyQuizPrevData();

// payment

export const instance = new RazorPay({
    key_id:process.env.RAZORPAY_ID_KEY,
    key_secret:process.env.RAZORPAY_SECRET_KEY
})