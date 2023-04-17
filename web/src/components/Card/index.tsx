import Link from 'next/link'
import { Container } from './styles'
import Image, { StaticImageData } from 'next/image'

interface CardProps {
  titulo: string
  img?: StaticImageData | undefined | any
  link?: string | any
  icon?: any
}

export default function Card({ titulo, img, link, icon }: CardProps) {
  return (
    <Link href={link} prefetch={false}>
      <Container className="container">
        <div className="">
          <div>
            {icon || (
              <Image
                quality={100}
                src={img}
                alt=""
                className="card-img-top"
                width={150}
                height={200}
                priority
              />
            )}
          </div>
        </div>
        <h5 className="text-dark">{titulo}</h5>
      </Container>
    </Link>
  )
}
