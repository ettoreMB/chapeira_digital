import { AppErrors } from '@shared/errors/AppErros'
import multerFastify from 'fastify-multer'

const storage = multerFastify.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toString()}-${file.originalname}`)
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  const isAccepted = ['image/png', 'image/jpeg', 'image/jpg'].find(
    (acceptedFormat) => acceptedFormat === file.mimetype,
  )
  console.log(isAccepted)
  if (!isAccepted) {
    cb(new AppErrors('Apenas imagens png/jpeg e jpg'))
    return cb()
  }
  return cb(null, true)
}

export const multer = multerFastify({ storage, fileFilter })
