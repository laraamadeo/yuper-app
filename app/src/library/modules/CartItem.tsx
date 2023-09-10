import Avatar from '../components/Avatar'
import Divider from '../components/Divider'
import { MinusIcon, PlusIcon, TrashIcon } from '../icons'
import './CartItem.css'

type Props = {
    author: { avatar: string, name: string, username: string },
    items: { title: string, quantity: number, price: number, _id: string }[],
    length: number,
    num: number,
    onPlusOne: (id: string) => void
    onMinusOne: (id: string) => void
}
export default function CartItem({ author, items, length, num, onPlusOne, onMinusOne }: Props) {
    const handlePlusClick = (id: string) => {
        onPlusOne(id)
    }


    return <>
        <div className='cart-item-container'>
            <div className='cart-item-author'>
                <Avatar image={author.avatar} width={'40px'} />
                <div className='cart-item-author-data'>
                    <p className='medium-text grey-700'>{author.name}</p>
                    <p className='small-text grey-400'>{author.username}</p>
                </div>
            </div>

            <div className='cart-items'>
                {/*@ts-ignore*/}
                {items.map(item => {
                    return <>
                        <div className='cart-item-item'>
                            <p className='medium-text-bold'>{item.title}</p>
                            <div className='cart-item-amount-container'>
                                <div className='cart-item-button-quantity-container'>
                                    {item.quantity > 1 ? <MinusIcon className='icon-xs grey-700' onClick={() => onMinusOne(item._id)} /> : <TrashIcon className='icon-xs grey-700' onClick={() => onMinusOne(item._id)} />}
                                    <p className='body-text-bold grey-700 cart-item-quantity-label'>{item.quantity}</p>
                                    <PlusIcon className='icon-xs grey-700' onClick={() => handlePlusClick(item._id)} />
                                </div>

                                <p className='heading-s grey-700'>{item.price * item.quantity} €</p>
                            </div>
                        </div>
                    </>
                })}
            </div>
            {length - 1 === num ? '' : <Divider width='100%' />}
        </div>
    </>
}