import { Router } from "express";

const router = Router();


router.get('/', (req, res) => {

    res.send('Hola Mundo Desde carts!');

});
export default router;