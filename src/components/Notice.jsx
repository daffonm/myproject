import { ActivityButton } from "./ActivityButton"

import xIcon from "../assets/icons/x-btn.png"

export function ConfirmationNotice ({title = "", message = "", submessage = "", buttonMessage = "Confirm", cancelMessage = "Cancel", onConfirmation, onCancel, img}) {
    return (
        <div className="confirm-notice">
            <ActivityButton cls={"x-btn"} handleclick={onCancel} >
                <img src={xIcon} alt="" />
            </ActivityButton>
            <div className="message">
                { img !== ""? 
                    <div className="image-wrapper">
                        <div className="notice-image">
                            <img src={img} alt="" />
                        </div> 
                        <h3 className="confirm-title">{title}</h3>
                    </div> :
                    <>
                        <h3 className="confirm-title">{title}</h3>
                    </>}
                <p className="confirm-desc">{message}</p>
                <p className="confirm-subdesc">{submessage}</p>
            </div>
            <div className="confirm-notice-btns">
                <ActivityButton
                cls={"cancel-notice-btn"}
                handleclick={onConfirmation}>
                    {buttonMessage}
                </ActivityButton>
                <ActivityButton
                cls={"confirm-notice-btn"}
                handleclick={onCancel}>
                    {cancelMessage}
                </ActivityButton>
            </div>

        </div>
    )
}

export function AlertNotice ({title = "", message = "", submessage = "", buttonMessage = "Confirm", onConfirmation, img}) {
    return (
        <div className="confirm-notice">
            <div className="message">
                { img !== ""? 
                    <div className="image-wrapper">
                        <div className="notice-image">
                            <img src={img} alt="" />
                        </div> 
                        <h3 className="confirm-title">{title}</h3>
                    </div> :
                    <>
                        <h3 className="confirm-title">{title}</h3>
                    </>}
                <p className="confirm-desc">{message}</p>
                <p className="confirm-subdesc">{submessage}</p>
            </div>
            <div className="confirm-notice-btns">
                <ActivityButton
                cls={"cancel-notice-btn"}
                handleclick={onConfirmation}>
                    {buttonMessage}
                </ActivityButton>
            </div>

        </div>
    )
}