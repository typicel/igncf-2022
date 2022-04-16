import prisma from "../lib/prisma";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AppShell } from "@mantine/core";

export const getServerSideProps = async () => {
  const polls = await prisma.poll.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  for (const poll of polls) {
    poll.createdAt = poll.createdAt.toString();
  }

  const users = await prisma.user.findMany();

  return { props: { polls, users } };
};

export default function Home(props) {
  return (
    <AppShell
      title="Polls"
      navbar={<Sidebar polls={props.polls} />}
      header={<Header />}
    />
  );
}
