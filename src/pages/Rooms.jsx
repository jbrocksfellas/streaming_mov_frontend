import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { useParams, useSearchParams } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import ReactPlayer from "react-player";
const { Text } = Typography;

export default function Rooms() {
  const [form] = Form.useForm();

  const params = useParams();
  const [searchParams] = useSearchParams();

  const [username, setUsername] = useState(searchParams.get("username"));
  const [id, setId] = useState(params.id);
  const [message, setMessage] = useState("");

  const [requestAccepted, setRequestAccepted] = useState(false);

  const { socket, sendJoinRequest, joinAccept, joinReject, sendMessage, joinRequests, messages, hasJoined } = useSocket();

  const ref = useRef();
  const [playing, setPlaying] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const senders = useRef([]);

  const onFinish = () => {
    sendMessage({ id, username, message, createdAt: Date.now() });
    form.resetFields();
  };

  useEffect(() => {
    if (username && id) {
      sendJoinRequest({ id, username });
    }

    return () => {};
  }, []);

  return (
    <div>
      {!hasJoined && <div>Loading...</div>}
      {hasJoined && (
        <>
          <div style={{ marginBottom: 10 }}>
            {joinRequests.map((joinRequest) => {
              return (
                <div style={{ display: "flex", gap: "10px", background: "white", padding: "10px 20px", borderRadius: "24px" }}>
                  <Text type="primary">{joinRequest.username}</Text>
                  <div>
                    <Button
                      onClick={() => {
                        joinAccept({ id: joinRequest.id, username: joinRequest.username, socketId: joinRequest.socketId });
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => {
                        joinReject({ id: joinRequest.id, username: joinRequest.username, socketId: joinRequest.socketId });
                      }}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {/* <video controls style={{ height: 500, width: 500 }} autoPlay ref={userVideo} />
            <video controls style={{ height: 500, width: 500 }} autoPlay ref={partnerVideo} />
            <button onClick={shareScreen}>Screen Share</button> */}
          </div>
          <ReactPlayer style={{ width: "100%", background: "blue" }} url={mediaStream} ref={ref} playing={playing} />
          <div>
            <div style={{ marginTop: "10px" }}>
              {messages.map((msg, i) => {
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "end", gap: "10px", marginTop: "5px" }}>
                    <Typography style={{ fontWeight: "bold" }}>{msg.username}: </Typography>
                    <Typography>{msg.message}</Typography>
                  </div>
                );
              })}
            </div>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              style={{ marginTop: 100 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 12,
                }}
                name="message"
                rules={[{ required: true, message: "Message cannot be empty" }]}
              >
                <Input
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 12,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}
