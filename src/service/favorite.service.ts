import { ZodError } from "zod";
import { Favorite } from "../db/models/favorite.model";
import { FavoriteInput, favoriteSchema, FavoriteUpdateInput, favoriteUpdateSchema, paginationSchema } from "../validations/schema";
import { validate as uuidValidate } from "uuid";
import { ApiError } from "../utils/ApiError";
import { Op } from "sequelize";
// import { favoriteSchema, FavoriteInput } from "../schemas/favorite.schema";

export async function createFavorite(payloadData: FavoriteInput) {
  try {
    const {success,error,data} = favoriteSchema.safeParse(payloadData ?? {});
    if (!success) {
      throw new ZodError(error.errors);
    }
  
    return await Favorite.create(data);
    
  } catch (error) {
    throw error;
  }
}

export async function listFavorites(page = 1, limit = 10) {
  try {
    const {success,error,data} = paginationSchema.safeParse({page,limit})
    if(!success){
      throw new ZodError(error.errors);
    }
    const offset = (data.page - 1) * data.limit;
    const { count, rows } = await Favorite.findAndCountAll({
      offset,
      limit,
      order: [["created_at", "DESC"]]
    });
    return { total: count, page, limit, data: rows };
    
  } catch (error) {
    throw error;
  }
}

export async function updateFavorite(id: string, updateData: FavoriteUpdateInput) {

  try {
    //first validate its uuid
    if (!uuidValidate(id)) {
      throw new ApiError(400, 'Invalid Entry ID format');
    }

    const {success,error,data}  = favoriteUpdateSchema.safeParse(updateData ?? {});
    if(!success){
      throw new ZodError(error.errors);
    }
  
    const favorite = await Favorite.findByPk(id);
    if (!favorite) throw new ApiError(400,"Entry not found");
  
    await favorite.update(data);
    return favorite;
  } catch (error) {
    throw error;
  }
}

export async function deleteFavorite(id: string) {
  try {
    //first validate its uuid
    if (!uuidValidate(id)) {
      throw new ApiError(400, 'Invalid Entry ID format');
    }
    const favorite = await Favorite.findByPk(id);
    if (!favorite) throw new ApiError(400,"Entry not found");
  
    await favorite.destroy();
    return { message: "Entry deleted successfully" };
    
  } catch (error) {
    throw error;
  }
}


export async function getFavoritesListBySearchKey(page = 1, limit = 10,search_key:string) {
  try {
    const {success,error,data} = paginationSchema.safeParse({page,limit})
    if(!success){
      throw new ZodError(error.errors);
    }
    const offset = (data.page - 1) * data.limit;
    const { count, rows } = await Favorite.findAndCountAll({
      offset,
      limit,
      order: [["created_at", "DESC"]],
      where: {
        title: {
          [Op.like]: `%${search_key}%`,
        },
      },
    });
    return { total: count, page, limit, data: rows };
    
  } catch (error) {
    throw error;
  }
}