import { Router } from 'express';
import { createFavoriteController, deleteFavoriteController, listFavoritesBySearchKeyController, listFavoritesController, updateFavoriteController,  } from '../controller/favorite.controller';

const router = Router();

router.post('/', createFavoriteController);

router.get('/', listFavoritesController);

router.patch('/:id', updateFavoriteController);

router.delete('/:id', deleteFavoriteController);

router.get('/search', listFavoritesBySearchKeyController);


export default router;
