import { useState } from "react";
import { useUserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";

import TransactionLog from "../components/TransactionLog";

import backIcon from "../assets/icons/arrow-right.png"
import { ActivityButton } from "../components/ActivityButton"

export default function Report() {
    const { transaction } = useUserContext()
    const navigate = useNavigate()

    const [activeTabs, setActiveTabs] = useState("History")

     // Function to group transactions by date
    const groupedTransactions = transaction.groupByDateIndex();

    const getComponent = (name) => {
        switch (name) {
            case "History":
                return <TransactionLog transactionDateObject={groupedTransactions} />
            default:
                break;
        }
    }

    return (
        <div>
            <div className="rp-header">
                <div className="rp-top">
                    <ActivityButton cls={"back-btn"} handleclick={() => navigate('/')}>
                        <img className="back-icon" src={backIcon} alt="" />
                    </ActivityButton>
                </div>
                <div className="rp-nav">
                    <ActivityButton handleclick={() => setActiveTabs("History")} cls={activeTabs === "History"? "rp-btn active" : "rp-btn"} >History</ActivityButton>
                    <ActivityButton handleclick={() => setActiveTabs("Income")} cls={activeTabs === "Income"? "rp-btn active" : "rp-btn"} >Income</ActivityButton>
                    <ActivityButton handleclick={() => setActiveTabs("Outcome")} cls={activeTabs === "Outcome"? "rp-btn active" : "rp-btn"} >Outcome</ActivityButton>
                </div>
            </div>
        
            <div>
                {getComponent(activeTabs)}
            </div>
        </div>

        
    )
            
}