import React from "react";
import Link from "next/link";

const Sidebar = ({ polls }) => {
  return (
    <div>
      <h1> Recent Polls: </h1>
      <ul>
        {polls.map((poll) => (
          <li>
            <Link href="/pollpage/[pollId]" as={`/pollpage/${poll.id}`}>
              <a>{poll.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
