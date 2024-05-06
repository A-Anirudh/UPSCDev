import React  from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Affair,
  AllClips,
  AllFavourites,
  ChangePassword,
  EmailSent,
  ForgotPassword,
  HelpAndSupport,
  Homepage,
  Login,
  Mainpage,
  NotFound,
  Profile,
  Register,
  SearchResults,
  SubscriptionSuccess,
  VerifyEmail,
  ViewContainer,
  WeeklyQuiz,
  Room
} from "./screens";

import { LoggedOutRoutes, PrivateRoutes } from "./utils";
import {
  BuySubscription,
  LeaderBoard,
  LoggedUserBar,
  Reader,
  Test,
  UnloggedUserBar,
} from "./components";
import { MyRooms } from "./screens/MyRooms";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const App = () => {
  const logged = localStorage.getItem("userInfo");
  // const [meetingExists, setMeetingExists] = useState(localStorage.getItem('meeting') === 'true');

  const meetingExists = useSelector((state) => state.quizOpen.meetingExists)

  // const oldLocalStorageValue  = localStorage.getItem('meeting');
  // if(localStorage.getItem('meeting') != oldLocalStorageValue){
  //   const meetingData = localStorage.getItem('meeting');
  //   setMeetingExists(meetingData === 'true');
  // }


  // useEffect(() => {
  //   // Check if meeting data exists in localStorage
  //   const meetingData = localStorage.getItem('meeting');
  //   setMeetingExists(meetingData === 'true');
  // }, [localStorage.getItem('meeting')]);

  const handleLeaveMeeting = () => {
    // Update state to hide ChatComponent
    setMeetingExists(false);
  };


  const loc = window.location.pathname;
  return (
    <>
   
    <BrowserRouter>
    
      {JSON.parse(logged)?.data?.pid ? <LoggedUserBar /> : <UnloggedUserBar />}

      <Routes>
        <Route path="/" element={<LoggedOutRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-sent" element={<EmailSent />} />
          <Route path={`/users/:id/verify/:token`} element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/users/:id/reset/:token" element={<ChangePassword />} />

        </Route>
        {/* <Route path="/all-affairs/:pid/:id" element={<Allaffairs />} /> */}
        <Route path="/affair/:id" element={<Reader />} />

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/home" element={<Mainpage />} />
          <Route path="/affair" element={<Affair />} />
          <Route path="/buy-subscription" element={<BuySubscription />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<AllFavourites />} />
          <Route path="/weekly-quiz" element={<WeeklyQuiz />} />

          <Route path="/paymentSuccess" element={<SubscriptionSuccess />} />
          <Route path="/help-support" element={<HelpAndSupport />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/clips" element={<AllClips />} />
          <Route path={`/affairs/all`} element={<ViewContainer />} />
          <Route path="/search-results/:searchItem" element={<SearchResults />} />
          <Route path="/search-results/" element={<SearchResults />} />
          {/* <Route path="/room/:roomId" element={<Room />} /> */}
          <Route path="/manage-rooms" element={<MyRooms />} />
          


        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    {meetingExists && <Test onLeaveMeeting={handleLeaveMeeting} />}
    </>
  );
};

export default App;
