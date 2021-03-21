const {Router} = require('express')
const User = require('../models/User')
const {check, validationResult} = require('express-validator/check')


const router = Router()
// /api/user/
router.post('/',
    [
        check('page').isNumeric().withMessage('Номер сторінки некоректний'),
        check('per_page')
            .isNumeric().withMessage('Некоректна кількість користувачів на сторінці')
            .isLength({min:2}).withMessage('Замала кількість користувачів на сторінці')
            
    ],
    async (req, res)=> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                errors: errors.array()[0]['msg']
                })
            }
            const currentPage = +req.body.page
            const countUsersOnPage = +req.body.per_page

            const users = await User.getUsersOnPage(currentPage,countUsersOnPage)
            res.status(201).json(users)
        } catch(e) {
            res.status(500).json({message: "Не вдалось отриматі дані користувачів, спробуйте ще"})
        }
    }
)

// /api/user/id
router.post('/:id',
    [
        check('dateFrom').isDate().withMessage('Некоректна початкова дата'),
        check('dateTo').isDate().withMessage('Некоректна кінцева дата')
    ],
    async (req, res)=> {
        try {
            const id = req.params.id
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                errors: errors.array()[0]['msg']
                })
            }

            const dateFrom = req.body.dateFrom
            const dateTo = req.body.dateTo
            const data = await User.getStatisticById(id, dateFrom, dateTo)
            res.status(201).json(data)
        } catch(e) {
            res.status(500).json({message: "Не вдалось отриматі дані користувача, спробуйте ще"})
        }
})

module.exports = router