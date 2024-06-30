import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prismaClient";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, type } = req.body;
    const imageName = req.file?.filename;

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_KEY!;
    const supabaseBucket = process.env.SUPABASE_BUCKET_NAME!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const image = await fs.readFile(path.join("src/uploads", imageName!));
    await supabase.storage.from(supabaseBucket).upload(imageName!, image);

    const {
      data: { publicUrl },
    } = supabase.storage.from(supabaseBucket).getPublicUrl(imageName!);

    const newProduct = await prisma.product.create({
      data: {
        name,
        type,
        image: publicUrl,
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
