import { Favorite } from "../db/models/favorite.model";
import { FavoriteInput, favoriteSchema } from "../validations/schema";
// import { favoriteSchema, FavoriteInput } from "../schemas/favorite.schema";

export async function createFavorite(data: FavoriteInput) {
  const parsed = favoriteSchema.safeParse(data);
  if (!parsed.success) {
    const errors = parsed.error.errors.map((err:any) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw new Error(JSON.stringify(errors));
  }

  const validData: FavoriteInput = parsed.data;
  return await Favorite.create(validData);
}

export async function listFavorites(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const { count, rows } = await Favorite.findAndCountAll({
    offset,
    limit,
    order: [["created_at", "DESC"]],
  });
  return { total: count, page, limit, data: rows };
}

export async function updateFavorite(id: string, data: any) {
  const parsed = favoriteSchema.safeParse(data);
  if (!parsed.success) {
    const errors = parsed.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw new Error(JSON.stringify(errors));
  }

  const favorite = await Favorite.findByPk(id);
  if (!favorite) throw new Error("Entry not found");

  await favorite.update(parsed.data);
  return favorite;
}

export async function deleteFavorite(id: string) {
  const favorite = await Favorite.findByPk(id);
  if (!favorite) throw new Error("Entry not found");

  await favorite.destroy();
  return { message: "Entry deleted successfully" };
}
