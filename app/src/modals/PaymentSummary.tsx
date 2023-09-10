import './PaymentSummary.css'
import ModalFullScreen from '../library/components/ModalFullScreen'
import Header from '../library/components/Header'
import ButtonBar from '../library/modules/ButtonBar'

type Props = {
    onClose: () => void
}

export default function PaymentSummary({ onClose }: Props) {
    return <>

        <ModalFullScreen onClose={onClose} topBarLabel="Summary">
            <div className="page-button-bar">
                <Header text={'Thanks! Order completed successfully!'} />
                <p className='body-text grey-700' style={{ marginBottom: '16px', marginTop: '16px' }}>Your order has been successfully completed. Please wait until the meal is ready to pick-up.</p>

                <p className='body-text grey-700' style={{ marginBottom: '40px' }}>Usually within 3 days, orders are ready.</p>
                <img className='illustration-gif' src='/illustrations/Done.png'></img>
            </div>
        </ModalFullScreen>
        <ButtonBar secondButton={{ label: 'Close', onClick: onClose }} />
    </>
}