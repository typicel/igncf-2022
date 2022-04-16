import prisma from "../lib/prisma";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import Header from "../components/Header";

export const getServerSideProps = async () => {
  const polls = await prisma.poll.findMany();
  for (const poll of polls) {
    poll.createdAt = poll.createdAt.toString();
  }

  const users = await prisma.user.findMany();

  return { props: { polls, users } };
};

export default function Home(props) {
  return (
    <div>
      <Header />
      <Sidebar polls={props.polls} />
      <ul>
        {props.users.map((user) => (
          <li>
            <Link href="/user/[user_id]" as={`/user/${user.id}`}>
              <a>{user.displayName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
