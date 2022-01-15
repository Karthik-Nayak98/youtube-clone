import { Routes, Route } from "react-router-dom";

import VideoPlayer from "./videoPlayer/videoplayer";
import NavBar from "./navbar/navbar";
import SideBar from "./sidebar/sidebar";
import VideoList from "./videolist/videolist";

function App() {
  return (
    <div className='App'>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path='/' element={<VideoList />} />
        <Route path=':videoId' element={<VideoPlayer />} />
      </Routes>
    </div>
  );
}

export default App;
