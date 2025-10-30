import { Router } from 'express';
import { createFavoriteController, deleteFavoriteController, listFavoritesController,  } from '../controller/favorite.controller';

const router = Router();

router.post('/', createFavoriteController);
router.get('/', listFavoritesController);
router.put('/:id', listFavoritesController);
router.delete('/:id', deleteFavoriteController);

export default router;
