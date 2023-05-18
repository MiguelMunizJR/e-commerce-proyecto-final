import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";
import { ROUTES_PATH } from "../consts";
import useOrders from "../hooks/useOrders";
import { OrdersLoading } from "./Loading";
import closeCartSlider from "../utils/closeCartSlider";

const Orders = ({ isLogin }) => {
	const navigate = useNavigate();
	const { orders, loading, getAllOrders } = useOrders();

	useEffect(() => {
		isLogin && getAllOrders();
		closeCartSlider();
		scrollToTop();
	}, []);

	return (
		<section className="orders">
			<article className="orders__card">
				<h2 className="orders__title">Orders</h2>
				<div className="productinfo__return">
					<p
						className="productinfo__return-home"
						onClick={() => navigate(ROUTES_PATH.HOME)}
					>
            Home
					</p>
					<div className="productinfo__return-circle"></div>
					<p className="productinfo__return-product">Orders</p>
				</div>
				<section className="orders__container">
					{loading ? (
						<OrdersLoading />
					) : orders?.length !== 0 ? (
						orders?.map((order) => (
							<main className="orders__product-card" key={order.id}>
								<header className="orders__product-header">
									<p className="orders__product-date">{order.date}</p>
									<p className="orders__product-total">
                    Total:<span> ${order.total}</span>
									</p>
								</header>
								{order?.products?.map((product) => (
									<article
										className="orders__product-container"
										key={product.id}
									>
										<div className="orders__product-article">
											<button
												className="orders__product-img"
												onClick={() =>
													navigate(`${ROUTES_PATH.PRODUCTS}/${product.id}`)
												}
											>
												<img src={product.image} alt={product.title} />
											</button>
											<div className="orders__product-body">
												<button
													className="orders__product-title"
													onClick={() =>
														navigate(`${ROUTES_PATH.PRODUCTS}/${product.id}`)
													}
												>
													{product.title}
												</button>
												<span className="orders__product-quantity">
													{product["order_details"]?.quantity}
												</span>
												<span className="orders__product-price">
													{`$ ${product["order_details"]?.total}`}
												</span>
											</div>
										</div>
									</article>
								))}
							</main>
						))
					) : (
						<div className="orders__container-div">
							<i className="fa-regular fa-face-frown orders__face"></i>
							<h4 className="orders__container-message">
                You do not have orders
							</h4>
						</div>
					)}
				</section>
			</article>
		</section>
	);
};

export default Orders;
