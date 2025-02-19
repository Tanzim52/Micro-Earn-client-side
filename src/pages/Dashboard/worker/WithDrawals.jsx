import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCoins from '../../../Hooks/useCoins';

const WithDrawals = () => {
    const { user } = useAuth();
    const [coins, refetch] = useCoins();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const totalCoins = watch("total_coins", 0);

    const onSubmit = async (data) => {
        if (coins.coins < data.total_coins) {
            toast.error("Insufficient coins.");
            return;
        }

        try {
            const withdrawAmount = (data.total_coins / 20).toFixed(2);
            const withDrawalInfo = {
                worker_email: user?.email,
                worker_name: user?.displayName,
                withdrawal_coin: data.total_coins,
                withdrawal_amount: withdrawAmount,
                payment_system: data.payment_system,
                withdraw_date: new Date(),
                account_number: data.account_number,
                status: "pending"
            }
            
            await axiosSecure.post("/withdraw", withDrawalInfo);
            // await axiosSecure.patch(`/users/${user.email}`, {
            //     coins: coins?.coins - parseInt(data.total_coins),
            // });
            toast.success("Withdrawal request submitted successfully!");
            reset();
            refetch();
            
           
        } catch (err) {
            toast.error("An error occurred while processing the withdrawal.");
        }
    };

    return (
        <div className='max-w-screen-lg py-10 px-10 min-h-screen mx-auto shadow-md text-gray-800 dark:bg-gray-950 bg-neutral dark:text-white'>
            <h1 className='text-4xl text-center font-semibold uppercase pt-10'>Withdraw Your Money</h1>
            <div className='flex mt-10 justify-between'>
                <p className='text-xl font-bold'>Your Current Coins: <span className='text-secondary'> {coins.coins}</span></p>
                <div>
                    <p className='text-xl font-bold'>Amount in Dollars: <span className='text-secondary'> {coins.coins >= 20 ? (coins.coins / 20).toFixed(2) : 0} USD</span></p>
                    <p className="text-sm mt-2 text-gray-600">
                        Note: You can withdraw when you have a minimum of 200 coins (10 USD).
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='border-t-2 mt-2'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white ">Total Coins<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <input
                        type="number"
                        {...register("total_coins", { required: true })}
                        placeholder="Type total coins you want to withdraw"
                        className="py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2"
                    />
                    {errors.total_coins && <span className='text-secondary'>Total Coins field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Withdraw Amount</span>
                    </label>
                    <input
                        readOnly
                        value={totalCoins >= 20 ? (totalCoins / 20).toFixed(2) : 0}
                        type="text"
                        className="py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white ">Payment System<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <select
                        {...register("payment_system", { required: true })}
                        className="py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2"
                    >
                        <option value="bcash">Bcash</option>
                        <option value="rocket">Rocket</option>
                        <option value="nagad">Nagad</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Account Number</span>
                    </label>
                    <input
                        type="number"
                        {...register("account_number", { required: true })}
                        placeholder="Enter your account number"
                        className="py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2"
                    />
                    {errors.account_number && <span className='text-secondary'>Account Number field is required</span>}
                </div>
                <div className="form-control mt-6">
                    {coins.coins >= 200 ? (
                        <button type='submit' className="btn btn-primary text-white text-xl rounded-none">Submit</button>
                    ) : (
                        <p className='text-secondary text-3xl font-bold text-center'>“Insufficient Coins”</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default WithDrawals;
