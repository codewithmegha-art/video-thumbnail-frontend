import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Gallery from "./pages/GalleryPage"
import UploadPage from "./pages/UploadPage"
import VideoDetail from "./pages/VideoDetail"

export default function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Gallery />} />

        <Route path="/upload" element={<UploadPage />} />

        <Route path="/video/:id" element={<VideoDetail />} />

      </Routes>

    </BrowserRouter>

  )

}