import styled from "styled-components";

const Container = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 4px;
  border-radius: 3px;
  border-left: solid 3px var(--blue);
  max-width: 500px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 5px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Message = styled.span`
  width: 100%;
  flex: 1;
`;

const Img = styled.img`
  max-height: 200px;
  object-fit: contain;
  width: auto;
`;

export function QuotedMessage({ message }) {
  function scrollToMessage() {
    const element = document.getElementById(message.quotedMsgId);
    if (element) {
      const originalBg = element.style.background;
      const originalPadding = element.style.padding;
      element.style.background = "#ffffff33";
      element.style.padding = "10px 5px";
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        element.style.background = originalBg;
        element.style.padding = originalPadding;
      }, 2000);
    }
  }

  function getTitle() {
    return (message?.quotedParticipant || "").replace(/[@c.us, @g.us]/g, "");
  }

  return (
    <Container onClick={scrollToMessage}>
      <Content>
        <span style={{ background: "#0003", padding: 2, borderRadius: 2 }}>
          {getTitle()}
        </span>
        {message?.quotedMsg?.type === "chat" ? (
          <Message>
            {message?.quotedMsg?.caption || message?.quotedMsg?.body}
          </Message>
        ) : (
          <>
            {message?.quotedMsg?.body && (
              <Img src={"data:image/png;base64," + message?.quotedMsg?.body} />
            )}
          </>
        )}
      </Content>
    </Container>
  );
}
