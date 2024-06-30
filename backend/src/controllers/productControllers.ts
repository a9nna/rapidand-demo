import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prismaClient";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, type } = req.body;
    const image = req.file?.filename;

    const newProduct = await prisma.product.create({
      data: {
        name,
        type,
        image,
      },
    });

    res.status(201).json({ product: newProduct });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};
