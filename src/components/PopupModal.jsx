import { ActivityButton } from "./ActivityButton"

export function ConfirmModal({onClose}) {
    return (
        <div className="confirm-modal">
            <ActivityButton handleclick={onClose}>X</ActivityButton>
        </div>
    )
}