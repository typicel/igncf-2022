import React from "react";
import prisma from "../../lib/prisma";
import Link from "next/link";

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
  console.log(poll.answers);
  return (
    <div>
      <Link href="/" as="/">
        Back to home
      </Link>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <p>{poll.createdAt}</p>

      {/* <h1>Users who responded:</h1>
      <ul>
        {poll.answer.map((answer) => (
          <li>
            <Link href="/user/[user_id]" as={`/user/${answer.user.id}`}>
              <a>{answer.user.displayName}</a>
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default PollPage;
