import { Avatar, Tooltip, useMediaQuery } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";

// import ScrollableFeed from "react-infinite-scroller";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const chatEndRef = useRef(null);

  const isSmallScreen = useMediaQuery("(max-width: 400px)");

  const scrollToBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div
      style={{ overflowY: "scroll", height: "900px", scrollbarWidth: "none" }}
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),

                marginTop: isSameUser(messages, m, i, user._id)
                  ? isSmallScreen
                    ? 3
                    : 3
                  : isSmallScreen
                  ? 5
                  : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ScrollableChat;
