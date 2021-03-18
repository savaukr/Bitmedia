const {Router} = require('express')
const router = Router()

// /api/static/
router.get('/', async (req, res)=> {
    try {
        //const {countUsers, currentPage} = req.query

    } catch(e) {
        res.status(500).json({message: "Не вдалось отриматі дані статистики, спробуйте ще"})
    }
})

// /api/static/:id
router.get('/:id', async (req, res)=> {
    try {
        
    } catch(e) {
        res.status(500).json({message: "Не вдалось отриматі дані статистики, спробуйте ще"})
    }
})

module.exports = router