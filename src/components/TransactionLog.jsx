import { useUserContext } from "../contexts/UserContext";

import { ActivityButton } from "./ActivityButton";

import rightIcon from "../assets/icons/arrow-right-icon.png"

export default function TransactionLog({ transactionDateObject }) {
    const { pushOverlay, popOverlay } = useUserContext()

    return (
        <div className="transaction-log">
            {Object.keys(transactionDateObject).map((date) => {
                return (
                    <div key={date} className="date-group">
                        <div className="top">
                            <h3>{date}</h3>
                        </div>
                        <div className="transaction-list">
                            {transactionDateObject[date].map((transaction) => (
                                <div key={transaction.id} className="transaction-item">
                                    <div className="transaction-info">
                                        <p>{transaction.date.day}/{transaction.date.month + 1}/{transaction.date.year}</p>
                                        <p>{transaction.id}</p>
                                        <p>{transaction.totalCount} item</p>
                                        <p>Rp. {transaction.totalPrice.toLocaleString()}</p>
                                    </div>
                                    <ActivityButton 
                                    cls={"transaction-details-btn"}
                                    handleclick={() => {
                                        pushOverlay("InvoicePage", {
                                            transaction: transaction,
                                            onClose: () => popOverlay()
                                            })
                                    }}>
                                        <img src={rightIcon}  />
                                    </ActivityButton>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
