const service = require("../service/authService");


router.post('/', async (req, res) => {
  const { status, message, data } = await service.register(req.body)
  return res.status(status).send({ message, data })
})