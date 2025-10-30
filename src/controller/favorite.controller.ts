import { NextFunction, Request, Response } from "express";
import {
  createFavorite,
  listFavorites,
  updateFavorite,
  deleteFavorite,
} from "../service/favorite.service";

export async function createFavoriteController(req: Request, res: Response,next:NextFunction) {
  try {
    const favorite = await createFavorite(req.body);
    return res.status(201).json(favorite);
  } catch (error: any) {
    next(error)
  }
}

export async function listFavoritesController(req: Request, res: Response,next:NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await listFavorites(page, limit);
    return res.json(result);
  } catch (error: any) {
    console.log(error)
     next(error)
  }
}

export async function updateFavoriteController(req: Request, res: Response,next:NextFunction) {
  try {
    const { id } = req.params;
    const favorite = await updateFavorite(id, req.body);
    return res.json(favorite);
  } catch (error: any) {
    next(error)
  }
}

export async function deleteFavoriteController(req: Request, res: Response,next:NextFunction) {
  try {
    const { id } = req.params;
    const result = await deleteFavorite(id);
    return res.json(result);
  } catch (error: any) {
    next(error)
  }
}
