import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useCoins from "../Hooks/useCoins";

const PurchaseCard = ({ img, coins, price }) => {
    const stripe = useStripe();
    const { user } = useAuth();
    const [,refetch] =useCoins();
    const elements = useElements();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosSecure();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalCoins = parseInt(coins);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);
        if (!stripe || !elements) {
            return; // Ensure Stripe.js has loaded
        }

        const card = elements.getElement(CardNumberElement);

        if (card == null) {
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card,
            });

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Payment successful!");
                
            }

        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePurchaseSubmit = async () => {
        setIsProcessing(true);
        const totalPrice = parseInt(price);
    
        try {
            // Retrieve clientSecret from your backend
            const res = await axiosSecure.post('/create-payment-intent', { price: totalPrice });
            setClientSecret(res.data.clientSecret);
    
            if (!res.data.clientSecret) {
                toast.error("Failed to get client secret.");
                return;
            }
    
            // Confirm the payment with the retrieved clientSecret
            const card = elements.getElement(CardNumberElement);
    
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(res.data.clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous',
                    },
                },
            });
            
            const result = await axiosSecure.post('/payment',{
                paymentId: paymentIntent.id,
                amount: paymentIntent.amount,
                payment_method: paymentIntent.payment_method_types[0],
                name: user?.displayName,
                email: user?.email,
                date: new Date(),
                totalCoins: totalCoins,
            })
            
            if (confirmError) {
                toast.error(confirmError.message || "Payment confirmation error.");
            } else if (paymentIntent?.status === "succeeded") {
                const coinUpdateRes = await axiosSecure.post('/update-user-coins', {
                    email: user?.email,
                    coins: totalCoins,
                });
                if (coinUpdateRes.data.modifiedCount > 0) {
                    toast.success(`Payment successful! ${coins} coins added to your account.`);
                    refetch();
                    // navigate('/dashboard/add-tasks')
                } else {
                    toast.error("Payment succeeded, but coins could not be updated.");
                }
            }
             
        } catch (err) {
            toast.error(err.message || "An error occurred while processing payment.");
        } finally {
            setIsProcessing(false);
        }
    };
    
    const handlePurchase = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="card card-compact h-[450px] bg-base-100 rounded-b-none shadow-xl">
            <figure>
                <img className="h-[200px] object-cover w-full" src={img} alt="coins" />
            </figure>
            <div className="card-body items-center text-center text-secondary">
                <h2 className="card-title text-5xl font-bold mt-10">{coins} coins</h2>
                <p className="text-4xl font-semibold">$ {price}</p>
                <div className="card-actions justify-end">
                    <button onClick={handlePurchase} className="btn btn-primary">
                        Purchase Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open fixed top-0 left-0 w-full h-full text-black bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="modal-box w-11/12 max-w-2xl bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">
                            Complete Your Purchase
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border w-full border-gray-300 rounded p-2">
                                    <label className="block text-gray-700 mb-1">Card Number</label>
                                    <CardNumberElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    color: "#424770",
                                                    "::placeholder": {
                                                        color: "#aab7c4",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#fa755a",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div className="border border-gray-300 rounded p-2">
                                    <label className="block text-gray-700 mb-1">Expiration Date</label>
                                    <CardExpiryElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    color: "#424770",
                                                    "::placeholder": {
                                                        color: "#aab7c4",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#fa755a",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-gray-300 rounded p-2">
                                    <label className="block text-gray-700 mb-1">CVC</label>
                                    <CardCvcElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    color: "#424770",
                                                    "::placeholder": {
                                                        color: "#aab7c4",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#fa755a",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handlePurchaseSubmit}
                                disabled={!stripe || isProcessing}
                                className={`w-full py-2 px-4 rounded-md text-white font-bold bg-primary ${isProcessing ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isProcessing ? "Processing..." : `Pay $ ${price}`}
                            </button>
                        </form>
                        <div className="modal-action mt-4">
                            <button
                                onClick={handleCloseModal}
                                className="btn bg-secondary hover:bg-secondary text-white w-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseCard;
