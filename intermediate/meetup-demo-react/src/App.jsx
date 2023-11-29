import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import AllMeetups from "./pages/AllMeetups";
import NewMeetup from "./pages/NewMeetup";
import Favorite from "./pages/Favorite";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetups />} />
        <Route path="/new-meetup" element={<NewMeetup />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </Layout>
  );
}
