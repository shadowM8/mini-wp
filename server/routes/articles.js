const router = require('express').Router()
const Controller = require('../controllers/article')
const images = require('../middlewares/images')
const auth = require('../middlewares/auth')

router.post('/',auth, images.multer.single('image'),images.sendUploadToGCS,Controller.create)
router.get('/',Controller.readAll)
router.get('/:id', Controller.findOne)
router.put('/:id',auth, Controller.update)
router.patch('/:id',auth,Controller.update)
router.delete('/:id',auth, Controller.delete)

module.exports = router