import React from "react";
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
  Room,
  MyRooms
} from "./screens";

import { LoggedOutRoutes, PrivateRoutes } from "./utils";
import {
  BuySubscription,
  LeaderBoard,
  LoggedUserBar,
  Reader,
  UnloggedUserBar,
} from "./components";

const App = () => {
  const logged = localStorage.getItem("userInfo");
  const loc = window.location.pathname;
  return (
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
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/rooms" element={<MyRooms />} />


        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
