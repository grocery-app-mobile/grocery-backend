import User from '../models/user.model.js';
import WalletTransaction from "../models/wallet.model.js";

const Service = {

    uploadKYC: async (body) => {

        const { userId, documentType, documentNumber, documentUrl } = body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    "kyc.status": "pending",
                    "kyc.documentType": documentType,
                    "kyc.documentNumber": documentNumber,
                    "kyc.documentUrl": documentUrl,
                    updatedAt: Date.now()
                }
            },
            { new: true }
        );

        return user;

    },

    walletTransactions: async (body) => {

        const { userId, type, amount, description } = body;

        const user = await User.findById(userId);
        if (!user) return { status: false, message: "User not found" }

        let newBalance = user?.wallet?.balance || 0;

        if (!user.wallet) {
            user.wallet = { balance: 0, currency: "INR" };
        }
        
        if (type === "credit" || type === "reward") {
            newBalance += amount;
        } else if (type === "debit") {
            if (user.wallet.balance < amount) {
                return { status: false, message: "Insufficient balance" }
            }
            newBalance -= amount;
        }

        user.wallet.balance = newBalance;
        user.updatedAt = Date.now();
        await user.save();

        const txn = new WalletTransaction({
            userId,
            type,
            amount,
            balanceAfter: newBalance,
            description
        });
        await txn.save();

        return { status: true, data: txn };

    },


};

export default Service;
