import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { Input } from "antd";
import { Button, Form } from "antd";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useSocket } from "../providers/Socket";
import { Typography } from "antd";
import { useEffect } from "react";
const { Text, Link } = Typography;

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

export default function Home() {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const [view, setView] = useState("join");

  const onFinish = () => {
    if (view === "create") {
      const id = uuid();

      // socket.emit("join_room", { id, username });
      navigate({
        pathname: "/rooms/" + id,
        search: createSearchParams({
          username,
        }).toString(),
      });
    } else {
      navigate({
        pathname: "/rooms/" + roomId,
        search: createSearchParams({
          username,
        }).toString(),
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <Header style={headerStyle}>{view === "join" ? "Enter a room id to join a room" : "Start a room"}</Header>
        <Content style={contentStyle}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: 100 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 12,
              }}
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input
                size="large"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Item>
            {view === "join" && (
              <>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 12,
                  }}
                  name="roomId"
                  rules={[{ required: true, message: "Please input your Room ID!" }]}
                >
                  <Input
                    size="large"
                    placeholder="Room Code"
                    value={roomId}
                    onChange={(e) => {
                      setRoomId(e.target.value);
                    }}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 12,
              }}
            >
              <Button type="primary" size="large" htmlType="submit">
                {view === "join" ? "Join Room" : "Create Room"}
              </Button>
            </Form.Item>
          </Form>
          <Link
            onClick={() => {
              if (view === "join") setView("create");
              else setView("join");
            }}
          >
            {view === "join" ? "create room?" : "join room?"}
          </Link>
        </Content>
        <Footer style={footerStyle}>This is sdfooter</Footer>
      </Layout>
    </>
  );
}
