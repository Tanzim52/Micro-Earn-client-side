import { Link } from "react-router-dom";
import goldCoin from '../../assets/buy-gold.jpg';
import PurchaseCard from "../../components/PurchaseCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PurchaseCoin = () => {
    return (
        <Elements stripe={stripePromise}>
            <div className="min-h-screen mt-10 max-w-screen-2xl">
                <div className="bg-[url('purchase_coins.jpg')] relative flex justify-center items-center my-4 bg-cover bg-center w-full h-[350px]">
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="max-w-screen-md space-y-2 dark:text-white text-white absolute">
                        <h3 className="md:text-7xl text-4xl uppercase font-bold">Purchase Coins</h3>
                        <p className="text-center md:text-xl text-lg">
                            <Link className="hover:text-secondary font-medium" to="/">Home</Link> / purchase-coins
                        </p>
                    </div>
                </div>
                <div className="py-20 max-w-screen-xl gap-6 mx-auto grid md:grid-cols-4 grid-cols-1">
                    <PurchaseCard img={goldCoin} coins="10" price="1" />
                    <PurchaseCard img={goldCoin} coins="150" price="10" />
                    <PurchaseCard img={goldCoin} coins="500" price="20" />
                    <PurchaseCard img={goldCoin} coins="1000" price="35" />
                </div>
            </div>
        </Elements>
    );
};

export default PurchaseCoin;
