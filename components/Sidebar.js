import React from "react";
import Link from "next/link";
import { Card } from "@mantine/core";

const Sidebar = ({ polls }) => {
  return (
    <div className="sidebar">
      <h1> Recent Polls </h1>
      <div className="card-container">
        {polls.map((poll) => (
          <Link href="/pollpage/[pollId]" as={`/pollpage/${poll.id}`}>
            <Card shadow="sm">
              <a>{poll.title}</a>
            </Card>
          </Link>
        ))}
      </div>
      <style jsx>{`
        h1 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .card-container {
          margin-bottom: 20px;
        }

        .sidebar {
          text-align: center;
          margin: 20px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
