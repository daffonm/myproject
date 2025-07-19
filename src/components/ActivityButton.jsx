

export function ActivityButton({cls, handleclick, children}) {

    const style = cls || ""

    return (
    <button 
    className={`activity-btn ${style}`}
    onClick={handleclick}>
    {children}
    </button>
    )
}