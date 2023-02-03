import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const SocketContext = createContext();
const { Provider } = SocketContext;

const useSocket = () => {
  return useContext(SocketContext);
};

const socket = io("http://localhost:8080");

const SocketProvider = ({ children }) => {
  const navigate = useNavigate();
  const [joinRequests, setJoinRequests] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const sendJoinRequest = ({ id, username }) => {
    socket.emit("join_room", { id, username });
  };

  const joinAccept = ({ id, username, socketId }) => {
    socket.emit("join_accept", { id, username, socketId });
    const requests = joinRequests.filter((joinRequest) => joinRequest.socketId != socketId);
    setJoinRequests(requests);
  };

  const joinReject = ({ id, username, socketId }) => {
    socket.emit("join_reject", { id, username, socketId });
    const requests = joinRequests.filter((joinRequest) => joinRequest.socketId != socketId);
    setJoinRequests(requests);
  };

  const sendMessage = ({ id, username, message, createdAt }) => {
    socket.emit("message", { id, username, message, createdAt });
    setMessages([...messages, { id, username, message, createdAt }]);
  };

  useEffect(() => {
    console.log("ran");
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("join_request", ({ id, username, socketId }) => {
      console.log(`Join Request from ${username}`);
      setJoinRequests([...joinRequests, { id, username, socketId }]);
    });

    socket.on("joined_room", ({ id, users }) => {
      console.log(`Room ${id} has been joined.`);
      console.log("Teammates", users);
      setUsers(users);
      setHasJoined(true);
    });

    socket.on("join_rejected", ({ id, username }) => {
      console.log("Join rejected by host");
      navigate("/");
    });

    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("join_request");
      socket.off("joined_room");
      socket.off("join_rejected");
      socket.off("message_received");
    };
  }, []);

  useEffect(() => {
    socket.off("message");

    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  return (
    <Provider value={{ socket, joinRequests, messages, hasJoined, setJoinRequests, sendJoinRequest, joinAccept, joinReject, sendMessage }}>{children}</Provider>
  );
};

export { SocketContext, SocketProvider, useSocket };
