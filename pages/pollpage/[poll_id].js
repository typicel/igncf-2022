import React, { useState } from "react";
import prisma from "../../lib/prisma";
import Header from "../../components/Header";
import { Button, List, Paper, Radio, RadioGroup } from "@mantine/core";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  let [vote, setVote] = useState("");

  const handleVote = async (e) => {
    e.preventDefault();
    alert(vote);
  };

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
          style={{
            width: "100vh",
            textAlign: "center",
            padding: "20px",
            marginBottom: "20px",
          }}
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

        {session ? (
          <form onSubmit={handleVote}>
            <RadioGroup value={vote} onChange={setVote}>
              {poll.possible_responses.map((response, index) => (
                <Radio value={response} label={response} />
              ))}
            </RadioGroup>
            <Button type="submit" color="blue">
              Cast
            </Button>
          </form>
        ) : (
          <h2>You must be logged in to vote</h2>
        )}
      </div>
    </>
  );
};

export default PollPage;
