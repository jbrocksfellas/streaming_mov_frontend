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
          <ReactPlayer url={"https://www.youtube.com/watch?v=WmR9IMUD_CY"} ref={ref} playing={playing} />
          <div>
            <div style={{ marginTop: "10px" }}>
              {messages.map((message) => {
                return (
                  <div key={message.createdAt} style={{ display: "flex", justifyContent: "end", gap: "10px", marginTop: "5px" }}>
                    <Typography style={{ fontWeight: "bold" }}>{message.username}: </Typography>
                    <Typography>{message.message}</Typography>
                  </div>
                );
              })}
            </div>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 800, marginTop: 100 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                wrapperCol={{
                  offset: 12,
                  span: 16,
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
                  offset: 22,
                  span: 22,
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
