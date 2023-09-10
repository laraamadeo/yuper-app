import Button from "../library/components/Button"
import ContextualModalMenu from "../library/modules/ContextualModalMenu"
import './DeleteModal.css'
import deleteMeal from "../logic/deleteMeal"
import useHandleError from "../logic/hooks/useHandleError"

type Props = {
    mealId: string,
    handleClose: () => void,
    onDelete: () => void

}

export default function DeleteModal({ mealId, handleClose, onDelete }: Props) {

    const handleErrors = useHandleError()

    const handleDeleteMeal = () => {
        (async () => {
            try {
                await deleteMeal(mealId)
                onDelete()
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    return <>
        <div className='contextualModal-overlay' onClick={handleClose}></div>
        <ContextualModalMenu >
            <>
                <div className="delete-modal-text">
                    <p className="title grey-700">Are you sure you want to delete this meal?</p>
                    <p className="body-text grey-500">This action cannot be undone. If any order is pending you will need to contact your customer to beware of situation.</p>
                </div>
                <div className="delete-modal-button-bar">
                    <Button type={"critical"} size={"medium"} label={"Delete meal"} onClick={handleDeleteMeal} />
                    <Button type={"secondary"} size={"medium"} label={"Cancel"} onClick={handleClose} />
                </div>
            </>
        </ContextualModalMenu>
    </>
}