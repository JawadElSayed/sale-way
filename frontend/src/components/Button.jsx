import { useState, useEffect } from "react";

const Button = ({
	children,
	onClick,
	backgroundColor = "secondary",
	rounded = "full",
	className = "",
	style,
	type = "button",
}) => {
	const [hover, setHover] = useState(false);
	const [buttonColor, setbuttonColor] = useState(backgroundColor);
	const [shadow, setShadow] = useState("");

	useEffect(() => {
		if (hover) {
			setbuttonColor("main-hover");
			setShadow("black-shadow");
		} else {
			setbuttonColor(backgroundColor);
			setShadow("");
		}
	}, [backgroundColor, hover]);

	return (
		<button
			type={type}
			className={`bg-${buttonColor} py-2 px-4 text-white text-2xl 
						rounded-${rounded} ${shadow} ${className} font-medium`}
			style={style}
			onClick={onClick}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			{children}
		</button>
	);
};

export default Button;
