import { Router } from 'express'

const router = Router({
  mergeParams: true
})

router.route('/echo')
  .get((req, res) => {
    res.status(200).json(req.query)
  })
  .post((req, res) => {
    console.log('req.body', req.body)
    res.status(200).json(req.body)
  })

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello World' })
})

export default router
