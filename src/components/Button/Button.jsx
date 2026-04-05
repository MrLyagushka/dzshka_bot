import './Button.css'

export default function Button({text, isActive, ...props}) {
    return (
    <button className={isActive ? 'button active' : 'button'} {...props}>{text}</button>
    )
}