import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import { SocketProvider } from "./providers/Socket";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  // backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  // backgroundColor: '#108ee9',
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  // backgroundColor: '#3ba0e9',
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  // backgroundColor: '#7dbcea',
};

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="rooms/:id" element={<Room />} /> */}
          <Route path="rooms/:id" element={<Rooms />} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
