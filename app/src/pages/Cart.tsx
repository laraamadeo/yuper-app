import './Cart.css'
import Topbar from '../library/modules/Topbar'
import Tabbar from '../library/modules/Tabbar'
import Tabs from '../library/components/Tabs'
import CartItem from '../library/modules/CartItem'
import ButtonBar from '../library/modules/ButtonBar'
import DataItem from '../library/components/DataItem'
import Divider from '../library/components/Divider'
import { useEffect, useState } from 'react'
import retrieveCartMeals from '../logic/retrieveCartMeals'
import useHandleError from '../logic/hooks/useHandleError'
import Payment from '../modals/Payment'
import removeMealFromCart from '../logic/removeMealFromCart'
import EmptyState from '../library/components/EmptyState'
import PendingOrderCard from '../library/modules/PendingOrderCard'
import retrievePendingToPickUp from '../logic/retrievePendingToPickUp'
import incrementMealsInCart from '../logic/incrementMealsinCart'
import { Timeout } from 'react-number-format/types/types'
import formatDate from '../logic/formatDate'
import useAppContext from '../logic/hooks/useAppContext'
import PaymentSummary from '../modals/PaymentSummary'
import Header from '../library/components/Header'
import markAsCompleted from '../logic/markAsCompleted'
import ContextualModalMenu from '../library/modules/ContextualModalMenu'
import Button from '../library/components/Button'



type Order = {
    author: Author
    meals: Meal[]
}


type Author = {
    _id: string
    username: string
    name: string
    email: string
    password: string
    description: string
    tags: string[]
    avatar: string
    availability: object[]
    location: string
    likedChefs: string[]
    reviews: object[]
    cart: object[]
    order: any[]
    selledMeals: SelledMeal[]
}

type Meal = {
    _id: string
    author: string
    images: string[]
    title: string
    description: string
    categories: string[]
    ingredients: string[]
    quantity: number
    bestBefore: string
    price: number
    date: string

}

type SelledMeal = {
    meal: string
    quantity: number
    author: string
    buyer: string
    status: string

}

type Item = {
    author: Author
    meals: { meal: Meal, quantity: number }[]
}

type PendingToPickUp = {
    serial: string
    date: string
    status: string
    total: number
    items: Item[]
}


type ContextualParams = {
    serial: string,
    chefId: string
}



export default function Cart() {

    const { navigate, loaderOn, loaderOff, toast } = useAppContext()

    const [meals, setMeals] = useState<Order[]>()

    const [timeoutId, setTimeoutId] = useState<Timeout>()

    const [total, setTotal] = useState(0)
    const [cartView, setCartView] = useState(true)
    const [pendingMeals, setPendingMeals] = useState<PendingToPickUp[]>()

    const [paymentModal, setPaymentModal] = useState(false)
    const [paymentDone, setPaymentDone] = useState<boolean>()

    const [completedContextualModal, setCompletedContextualModal] = useState<ContextualParams | null>(null)

    const handleErrors = useHandleError()

    const handlePay = () => {
        setPaymentModal(true)
    }

    const refreshCartMeals = () => {
        (async () => {
            try {
                const meals = await retrieveCartMeals()
                setMeals(meals)
                calculateTotal(meals)

                const _pendingMeals = await retrievePendingToPickUp()
                const pendingMealsFiltered = _pendingMeals.filter((meal: PendingToPickUp) => meal.status !== 'complete')
                const pendingMeals = calculatePendingOrderTotal(pendingMealsFiltered).toReversed()
                setPendingMeals(pendingMeals)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    useEffect(() => {
        refreshCartMeals()
    }, [])

    const toggleTabView = () => {
        setCartView(!cartView)
        if (cartView === true)
            refreshCartMeals()
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


    const onComplete = (serial: string, chefId: string) => {
        setCompletedContextualModal({ serial, chefId })
    }

    const handleConfirmComplete = () => {
        (async () => {
            try {
                loaderOn()
                //@ts-ignore
                const { serial: _serial, chefId: _chefId } = completedContextualModal

                await markAsCompleted(_serial, _chefId)

                setCompletedContextualModal(null)

                refreshCartMeals()

                setTimeout(() => {
                    loaderOff()
                    toast('Order completed successfully', 'success')
                }, 600)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    const handleAddOneMore = (id: string) => {
        const foundMeal = findMealById(id, meals!)
        //@ts-ignore
        if (foundMeal) foundMeal.quantity++

        setMeals(meals)

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        const newTimeoutId = setTimeout(() => {
            (async () => {
                try {
                    //@ts-ignore
                    await incrementMealsInCart(id, foundMeal!.quantity)

                } catch (error: any) {
                    handleErrors(error)
                }
            })()
        }, 500)

        setTimeoutId(newTimeoutId)
    }


    const findMealById = (id: string, meals: Order[]) => {
        let foundMeal = null

        meals.forEach((item: any) => {
            const meal = item.meals.find((meal: any) => meal._id === id)
            if (meal) {
                foundMeal = meal
                return
            }
        })
        return foundMeal
    }

    const handleRemoveOne = (id: string) => {
        const foundMeal = findMealById(id, meals!)
        //@ts-ignore
        if (foundMeal) foundMeal.quantity -= 1

        setMeals(meals)

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        const newTimeoutId = setTimeout(() => {

            (async () => {
                try {
                    //@ts-ignore
                    await removeMealFromCart(id, foundMeal!.quantity)
                    refreshCartMeals()
                } catch (error: any) {
                    handleErrors(error)
                }
            })()
        }, 500)
        setTimeoutId(newTimeoutId)
    }

    const handlePayFromModal = () => {
        loaderOn()
        setTimeout(() => {
            setPaymentModal(false)
            setPaymentDone(true)
            loaderOff()
        }, 800)
    }

    const calculatePendingOrderTotal = (pendingMeals: any) => {
        for (let obj of pendingMeals) {
            let total = 0

            for (let item of obj.items) {
                let itemTotal = 0

                for (let meal of item.meals) {
                    const price = parseFloat(meal.meal.price)
                    const quantity = meal.quantity

                    itemTotal += price * quantity
                }

                item.total = itemTotal
                total += itemTotal
            }
            obj.total = total
        }
        return pendingMeals
    }

    return <>
        {completedContextualModal && <>
            <div className='contextualModal-overlay' onClick={() => setCompletedContextualModal(null)}></div>
            <ContextualModalMenu >
                <>
                    <div className="delete-modal-text">
                        <p className="title grey-700">Have you picked up your order?</p>
                        <p className="body-text grey-500"> Check that everything in your order is as expected. If not, please conteact with the chef.</p>
                    </div>
                    <div className="delete-modal-button-bar">
                        <Button type={"primary"} size={"medium"} label={"All good"} onClick={handleConfirmComplete} />
                        <Button type={"secondary"} size={"medium"} label={"Cancel"} onClick={() => setCompletedContextualModal(null)} />
                    </div>
                </>
            </ContextualModalMenu>
        </>
        }
        {paymentModal && !paymentDone && <Payment onPaymentClose={() => setPaymentModal(false)} onPayClick={handlePayFromModal} />}
        {!paymentModal && !paymentDone && <>
            <Topbar level={'first'} firstLevel={{ onChatClick: () => alert('🛠️ Feature coming soon! Please, be patient') }} />

            <div className="page-first-level" onDragEnd={() => window.location.reload()} >
                <Tabs items={[
                    {
                        label: "Your order",
                        selected: cartView,
                        onClick: toggleTabView
                    },
                    {
                        label: "To pick up",
                        selected: !cartView,
                        onClick: pendingMeals?.length === 0 ? null : toggleTabView,
                        disable: pendingMeals?.length === 0
                    }]} />

                {/* CART TAB */}
                {cartView &&
                    <>
                        {meals && meals.length > 0 && <>
                            {meals && <div className='cart-items-list'>
                                {meals.map((meal, index) => {
                                    return <CartItem
                                        author={
                                            {
                                                avatar: meal.author.avatar,
                                                name: meal.author.name,
                                                username: `@${meal.author.username}`
                                            }}
                                        items={meal.meals}
                                        length={meals.length}
                                        num={index}
                                        onPlusOne={(id) => handleAddOneMore(id)}
                                        onMinusOne={(id) => handleRemoveOne(id)} />
                                })
                                }
                            </div>}
                        </>}

                        {/* CART - EMPTY STATE */}
                        {meals && meals.length === 0 && <>
                            <div className="empty-state-cart"><EmptyState src="/illustrations/EmptyState.png" title="No meals added yet!" description="Add some meals to your cart to start enjoying Yuper!" width="240px" /> </div>

                        </>}


                    </>}

                {/* PENDING TAB */}
                {!cartView &&
                    <>

                        {pendingMeals &&
                            <>
                                <div className='pending-cart-instructions'>
                                    <Header text={'How to pick up meals'} />
                                    <p className='body-text grey-700' style={{ marginBottom: '16px' }}>Wait until your order has <b>'Ready'</b> status to pick it up.</p>

                                    <p className='body-text grey-700'>When picking it up, <b>click on the order</b> to mark it as completed.</p>
                                </div>
                                <div className='pending-cart-items-list'>
                                    {pendingMeals.map((obj: PendingToPickUp, index) => {
                                        let _serial = obj.serial
                                        let _date = formatDate(new Date(obj.date))
                                        let _status = obj.status
                                        let _total = obj.total
                                        return obj.items.map((item: Item) => {
                                            let _quantity: number = 0

                                            for (const meal of item.meals) {
                                                _quantity += meal.quantity
                                            }

                                            return <><PendingOrderCard
                                                image={item.author.avatar}
                                                chefName={item.author.name}
                                                chip={{ label: _status, status: _status === 'pending' ? 'warning' : 'success' }}
                                                quantity={_quantity}
                                                total={_total}
                                                serial={_serial}
                                                date={_date}
                                                onCompletedLink={() => onComplete(_serial, item.author._id)} />
                                                {index !== pendingMeals.length - 1 && <Divider width='100%' className='pending-cart-divider' />}
                                            </>
                                        })
                                    })}
                                </div>
                            </>}
                        {pendingMeals?.length === 0 && <>
                            <div className="empty-state-profile"><EmptyState src="/illustrations/EmptyState.png" title="No meals pending" description="Start paying some meals!" width="240px" /> </div>
                        </>}
                    </>}
            </div>
            {/* CART - BUTTON BAR */}
            {cartView && meals && meals.length > 0 && <ButtonBar firstButton={{ label: "Pay", onClick: handlePay }} className='cart-buttonBar'>
                <div className='cart-buttonBar-data-item'>
                    <DataItem label='Total' content={`${total} €`} />
                    <Divider width='100%' />
                </div>
            </ButtonBar>}
            <Tabbar cart={true} />
        </>
        }
        {paymentDone && <PaymentSummary onClose={() => navigate('/')} />}
    </>
}


