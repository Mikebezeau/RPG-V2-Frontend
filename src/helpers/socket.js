import io from "socket.io-client";
import axios from "axios";
import { CONFIG } from "../data/constants/configConstants";

export const initiateSocket = (channel, nickname) => {
  console.log("Connecting to socket", channel, nickname);
  const socket = io(CONFIG.socket.url, {
    query: { channel, nickname },
  });
  if (socket && channel) {
    socket.emit("CHANNEL_JOIN", channel);
  }
  return socket;
};

export const switchChannel = (socket, prevChannel, channel) => {
  if (socket) {
    socket.emit("CHANNEL_SWITCH", { prevChannel, channel });
  }
};

export const subscribeToMessages = (socket, callback) => {
  if (!socket) {
    return;
  }
  socket.on("NEW_MESSAGE", (data) => {
    callback(null, data);
  });
};

export const sendMessage = (socket, data) => {
  if (!socket) {
    return;
  }
  socket.emit("MESSAGE_SEND", data);
};

export const fetchChannels = async () => {
  const response = await axios.get(`${CONFIG.socket.url}/getChannels`);
  return response.data.channels;
};

export const fetchChannelMessages = async (channel) => {
  const response = await axios.get(
    `${CONFIG.socket.url}/channels/${channel}/messages`
  );
  return response.data.allMessages;
};
