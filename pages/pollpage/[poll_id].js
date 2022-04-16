import React from "react";
import prisma from "../../lib/prisma";
import Header from "../../components/Header";
import { List, Paper } from "@mantine/core";

export const getServerSideProps = async ({ params }) => {
  const poll = await prisma.poll.findUnique({
    where: {
      id: String(params.poll_id),
    },
  });
  poll.createdAt = poll.createdAt.toString();

  return { props: { poll } };
};

const PollPage = ({ poll }) => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          className="poll-paper"
          shadow="sm"
          style={{ width: "100vh", textAlign: "center", padding: "20px" }}
        >
          <h1>{poll.title}</h1>
          <p>{poll.description}</p>
          <p>Created on {new Date(poll.createdAt).toDateString()}</p>
          <hr></hr>
          <List spacing="xs" size="lg" style={{ textAlign: "left" }}>
            {poll.possible_responses.map((response) => (
              <List.Item>{response}</List.Item>
            ))}
          </List>
        </Paper>
        {/* styles */}
        <style jsx>{`
          .poll-paper {
            color: red;
            width: 50%;
            text-align: "center";
            padding: "20px";
          }
        `}</style>
      </div>
    </>
  );
};

export default PollPage;
