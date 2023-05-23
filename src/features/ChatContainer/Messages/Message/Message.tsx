type Props = {
	message: string
}

export const Message = ({message}: Props) => {
  return (
		<div>
			{message}
		</div>
	)
}