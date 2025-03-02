import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prismaClient";

export const createClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      dateOfBirth,
      lastName,
      email,
      phone,
      address,
      creditCardNumber,
      cvv,
      expirationDate,
      parish,
      town,
    } = req.body;

    const newClient = await prisma.client.create({
      data: {
        name,
        dateOfBirth: new Date(dateOfBirth),
        lastName,
        email,
        phone,
        address,
        creditCardNumber,
        cvv,
        expirationDate,
        parish,
        town,
      },
    });

    res.status(201).json({ client: newClient });
  } catch (error) {
    next(error);
  }
};

export const getClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json({ clients });
  } catch (error) {
    next(error);
  }
};
