import React from "react";
import prisma from "../../lib/prisma";

export const getServerSideProps = async ({ params }) => {
  let user = await prisma.user.findUnique({
    where: {
      id: String(params.user_id),
    },
  });

  return { props: { user } };
};

const UserPage = (props) => {
  console.log(props.user);
  return (
    <div>
      <h1>{props.user.displayName}</h1>
    </div>
  );
};

export default UserPage;
