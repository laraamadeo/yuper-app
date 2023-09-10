import './Payment.css'
import ModalFullScreen from '../library/components/ModalFullScreen'
import ButtonBar from '../library/modules/ButtonBar'
import Avatar from '../library/components/Avatar'
import DataItem from '../library/components/DataItem'
import Divider from '../library/components/Divider'
import RadioButton from '../library/components/RadioButton'
import { useEffect, useState } from 'react'
import TextField from '../library/components/TextField'
import useHandleError from '../logic/hooks/useHandleError'
import retrieveCartMeals from '../logic/retrieveCartMeals'
import payMealsInCart from '../logic/payMealsInCart'
import PaymentSummary from './PaymentSummary'
import Header from '../library/components/Header'
import useAppContext from '../logic/hooks/useAppContext'

type Props = {
    onPaymentClose: () => void,
    onPayClick: () => void
}

type Author = {
    avatar: string
    name: string
    username: string
    location: string
}

type Meal = {
    _id: string
    author: string
    title: string
    price: number
    quantity: number
}

type Order = {
    author: Author
    meals: Meal[]
}

export default function Payment({ onPaymentClose, onPayClick }: Props) {
    const [paymentMethod, setPaymentMethod] = useState("")
    const { loaderOn, loaderOff } = useAppContext()
    const handleErrors = useHandleError()
    const [meals, setMeals] = useState<Order[]>()
    const [paymentDone, setPaymentDone] = useState(false)
    const [total, setTotal] = useState<number>()

    useEffect(() => {
        (async () => {
            try {
                const meals = await retrieveCartMeals()
                setMeals(meals)
                calculateTotal(meals)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }, [])

    const handlePay = () => {
        (async () => {
            try {
                loaderOn()
                await payMealsInCart()
                setTimeout(() => {
                    loaderOff()
                    onPayClick()
                }, 1000)
            } catch (error: any) {
                loaderOff()
                handleErrors(error)
            }
        })()
    }

    const calculateTotal = (meals: Order[]) => {
        let total = 0

        meals.forEach(author => {
            author.meals.forEach(meal => {
                total += meal.quantity * meal.price
            })
        })
        setTotal(total)
    }

    const toggleRadioSelection = (value: string) => {
        setPaymentMethod(value)
    }

    return <>
        {!paymentDone && <>
            <ModalFullScreen onClose={onPaymentClose} topBarLabel="Payment">
                <div className="page-button-bar">
                    <Header text={'Payment summary'} />
                    {meals && <>
                        {/* order-summary */}
                        <div className='payment-order-summary'>
                            <div className='payment-item-container'>

                                {/* order-summary-author */}
                                {meals.map((item, index) => {
                                    return <>
                                        <div className='payment-item-author'>

                                            <Avatar image={item.author.avatar} width={'40px'} />
                                            <div className='payment-item-author-data'>
                                                <p className='medium-text grey-700'>{item.author.name}</p>
                                                <p className='small-text grey-400'>{item.author.username}</p>
                                            </div>
                                        </div>

                                        {/* order-summary-meal */}
                                        {item.meals.map((meal) => {
                                            return <div className='payment-items-container'>
                                                <div className='payment-item-item-container'>
                                                    <p className='body-text-bold grey-700'>{meal.quantity}</p>
                                                    <p className='body-text grey-700'>{meal.title}</p>
                                                </div>
                                            </div>
                                        })}
                                        <DataItem label='Pick-up location' content={item.author.location} />
                                        {meals.length - 1 === index ? '' : <Divider width='100%' />}
                                    </>
                                })}
                            </div>
                        </div>

                        {/* payment-method */}
                        <div className='payment-payment-method'>
                            <Divider width='100%' className='payment-divider-section' />
                            <div className='payment-inside-section-content'>

                                <p className='body-text grey-400'>Payment method</p>
                                <RadioButton name='cash' value='cash' onChange={(value) => toggleRadioSelection(value)} checked={paymentMethod === 'cash'} text='Cash' />
                                <RadioButton name='card' value='card' onChange={(value) => toggleRadioSelection(value)} checked={paymentMethod === 'card'} text='Debit/Credit card' />

                                {/* card-details-form */}
                                {paymentMethod === 'card' && <form className='payment-card-details-form'>
                                    <TextField label={`Card holder's name`} name='cardHolder' type='text' />
                                    <TextField label={`Card number`} name='cardNumber' type='text' />
                                    <div className='payment-card-details-security-code'>
                                        <TextField label={`Expiry date`} name='expiryDate' type='text' />
                                        <TextField label={`CVV`} name='cvv' type='text' />
                                    </div>
                                </form>}

                            </div>
                        </div>

                        {/* total-calculation */}
                        <div className='payment-total'>
                            <Divider width='100%' className='payment-divider-section' />
                            <div className='payment-inside-section-content'>
                                {total && <>
                                    <DataItem label='Subtotal' content={total.toString()} />
                                    <DataItem label='Buyer protection fee' content={'0,95 €'} />
                                    <Divider width='100%' />
                                    <DataItem label='Total' content={(total + 0.95).toString()} />
                                </>}
                            </div>
                        </div>
                    </>}

                </div>
            </ModalFullScreen>
            <ButtonBar firstButton={{ label: "Pay", onClick: handlePay }} />
        </>}
    </>
}
