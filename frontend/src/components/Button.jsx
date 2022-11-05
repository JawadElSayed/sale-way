import { useState, useEffect } from "react";

const Button = ({
	children,
	onClick,
	backgroundColor,
	rounded = "full",
	className = "",
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
			className={`bg-${buttonColor} mt-8 py-2 text-white text-2xl 
                        rounded-${rounded} ${shadow} ${className} `}
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
