interface Props {
  mensagem: string
}

export default function NenhumColaborador({ mensagem }: Props) {
  return (
    <div
      className=" col-10 flex-fill bg-light text-center radius-1"
      style={{ height: 32 }}
    >
      {mensagem}
    </div>
  )
}
