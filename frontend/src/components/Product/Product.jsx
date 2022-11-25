import { baseUrl } from "../../config/config";
import { useState } from "react";
import "./index.css";
import { useEffect } from "react";

const ProductModal = ({ display = "", product }) => {
	const [slideIndex, setSlideIndex] = useState(0);

	const slides = Array.from(document.querySelectorAll(".mySlides"));

	useEffect(() => {
		if (slideIndex > product.images?.length - 1) setSlideIndex(0);
		if (slideIndex < 0) setSlideIndex(product.images?.length - 1);

		slides.forEach((element, index) => {
			element.style.display = "none";
			if (index === slideIndex) element.style.display = "block";
		});
	}, [product.images, slideIndex, slides]);

	return (
		<>
			<div className={`product-modal ${display}`}>
				<div
					className="product-modal-content product-animate rounded-2xl"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="p-8">
						<div className="slideshow-container">
							{product.images?.map((image) => {
								return (
									<div
										className="mySlides fade"
										key={image.image}
									>
										<img
											src={`${baseUrl}${image.image}`}
											className="w-full h-80"
											alt="Product img"
										/>
									</div>
								);
							})}
							<p
								className="prev"
								onClick={() => setSlideIndex(slideIndex - 1)}
							>
								❮
							</p>
							<p
								className="next"
								onClick={() => setSlideIndex(slideIndex + 1)}
							>
								❯
							</p>
						</div>

						<h2 className="pt-4">{product.name}</h2>
						<h3>
							{
								product.product_categories?.[0]?.categories
									.category
							}
						</h3>
						<p className="pt-4">{product.description}</p>
						<h3 className="pt-4">{`Discount: ${product.discount}%`}</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductModal;
