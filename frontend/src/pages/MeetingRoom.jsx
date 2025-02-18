import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LiveVideo from "../components/LiveVideo";
import ConnectForm from "../components/ConnectForm";
import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";
import Whiteboard from "../components/Whiteboard"; // Custom whiteboard component

const MeetingRoom = () => {
  const appId = "e5ea11931e474f3a8aeafe648e56ff92";
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
  const navigate = useNavigate();

  const handleConnect = (channelName) => {
    navigate(`/meeting-room/${channelName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Routes>
        {/* Home Screen for Joining a Meeting */}
        <Route
          path=""
          element={
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Join a Meeting</h2>
              <ConnectForm connectToVideo={handleConnect} />
            </div>
          }
        />

        {/* Meeting Room */}
        <Route
          path=":channelName"
          element={
            <AgoraRTCProvider client={agoraClient}>
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-6">
                <h2 className="text-3xl font-bold mb-6">Meeting Room</h2>
                <LiveVideo />

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  {/* Leave Meeting Button */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => navigate('/meeting-room')}
                  >
                    Leave Meeting
                  </button>

                  {/* Whiteboard Button */}
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => navigate(`/meeting-room/whiteboard`)}
                  >
                    Open Whiteboard
                  </button>
                </div>
              </div>
            </AgoraRTCProvider>
          }
        />

        {/* Whiteboard Room */}
        <Route
          path="whiteboard"
          element={
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 px-4 py-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Whiteboard</h2>
              <Whiteboard />

              <div className="mt-8">
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => navigate(-1)}
                >
                  Back to Meeting Room
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default MeetingRoom;
