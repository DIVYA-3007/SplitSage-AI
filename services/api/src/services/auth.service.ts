import prisma from "../prisma/client";
import bcrypt from "bcrypt";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const exists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (exists) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
    },
  });

  return user;
}