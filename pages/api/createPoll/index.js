import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const pollData = req.body;
  const newPoll = await prisma.poll.create({
    data: pollData,
  });
  res.redirect(`/pollpage/${newPoll.id}`);
}
