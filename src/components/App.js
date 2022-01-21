import { Routes, Route } from "react-router-dom";

import AuthContextProvider from "../context/authcontext";

import VideoPlayer from "./videoPlayer/videoplayer";
import NavBar from "./navbar/navbar";
import VideoList from "./videolist/videolist";
import SearchList from "./searchlist/searchlist";

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<VideoList />} />
          <Route path=':videoId' element={<VideoPlayer />} />
          <Route path='/results' element={<SearchList />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
