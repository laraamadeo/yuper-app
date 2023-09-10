import Avatar from '../components/Avatar'
import Button from '../components/Button'
import Chip from '../components/Chip'
import Container from '../components/Container'
import Divider from '../components/Divider'
import Link from '../components/Link'
import './PendingOrderCard.css'

type Props = {
    image: string,
    chefName: string,
    chip: { label: string, status: string },
    quantity: number,
    total: number,
    serial: string,
    date: string,
    onCompletedLink: () => void
}

export default function PendingOrderCard({ image, chefName, chip, quantity, total, serial, date, onCompletedLink }: Props) {

    return <>
        <div className='pending-order-container'>
            <>
                <div className='pending-order-info-n-avatar'>
                    <Avatar image={image} width={'48px'} />
                    <div className='pending-order-info'>
                        <div className='pending-order-first-row'>
                            <p className='body-text-bold'>{chefName}</p>
                            <Chip label={chip.label} state={chip.status} />
                        </div>

                        <div className='pending-order-second-row'>
                            <p className='body-text-bold pending-order-meal-label'>{quantity}<p className='body-text grey-700'>meals</p></p>
                            <p className='medium-text-bold'>{`${total} €`}</p>
                        </div>

                        <div className='pending-order-third-row'>
                            {/* <p className='small-text grey-400 pending-order-serial'>{serial}</p> */}
                            <p className='small-text grey-400'>{date}</p>

                        </div>
                    </div>
                </div>
            </>
            {chip.label === "ready" && <Button type={'secondary'} size={'extrasmall'} label={'Mark as completed'} onClick={onCompletedLink} />}

        </div>
    </>
}

