import s from './Input.module.css'

export const Input = () => {
	return (
		<div className={s.inputBlock}>
			<textarea placeholder={"Введите сообщение"} className={s.input}></textarea>
		</div>
	)
}