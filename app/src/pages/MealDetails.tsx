import { useEffect, useState } from 'react'
import './MealDetails.css'
import Header from '../library/components/Header'
import CategoryInteractive from '../library/components/CategoryInteractive'
import IconButton from '../library/components/IconButton'
import { ArrowLeftIcon, ArrowRightIcon, EllipsisVerticalIcon, MinusIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '../library/icons'
import DataItem from '../library/components/DataItem'
import ChefModule from '../library/modules/ChefModule'
import ButtonBar from '../library/modules/ButtonBar'
import { useParams, useLocation } from 'react-router-dom'
import retrieveMeal from '../logic/retrieveMeal'
import getUserId from '../logic/getUserId'
import ContextualModalMenu from '../library/modules/ContextualModalMenu'
import Link from '../library/components/Link'
import Topbar from '../library/modules/Topbar'
import EditMeal from '../modals/EditMeal'
import DeleteModal from '../modals/DeleteModal'
import useAppContext from '../logic/hooks/useAppContext'
import useHandleError from '../logic/hooks/useHandleError'
import Divider from '../library/components/Divider'
import addMealToCart from '../logic/addMealToCart'
import { Carousel } from 'flowbite-react'
import isUserLoggedIn from '../logic/isUserLoggedIn'
import Spinner from '../library/components/Spinner'
import toggleLikeChef from '../logic/toggleLikeChef'
import retrieveUser from '../logic/retrieveUser'


type Meal = {
    author: { avatar: string, name: string, description: string, id: string },
    images: Array<string>,
    title: string,
    description: string,
    ingredients: string[],
    bestBefore: string,
    price: string,
    categories: Array<string>,
    id: string,
    quantity: number
}

type User = {
    name: string,
    availability: Array<object>,
    avatar: string,
    username: string,
    description: string,
    tags: string[],
    likedChefs: string[]
}


export default function MealDetails(): JSX.Element {

    const { loaderOff, loaderOn, navigate, toast } = useAppContext()
    const handleErrors = useHandleError()

    const [meal, setMeal] = useState<Meal>()
    const [user, setUser] = useState<User>()

    const { mealId } = useParams<string>()
    const userId = getUserId()

    const [contextualModal, setContextualModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const [openCategory, setOpenCategory] = useState<string>("")

    const location = useLocation()
    const from = location.state

    const [mealCounter, setMealCounter] = useState(0)
    const [counterButtonLabel, setCounterButtonLabel] = useState<string>()
    const [mealStock, setMealStock] = useState()

    const [userLogged, setUserLogged] = useState<boolean>()


    const refreshData = () => {
        (async () => {
            try {
                const meal = await retrieveMeal(mealId!)
                setMeal(meal)
                setCounterButtonLabel(meal.price)
                setMealStock(meal.quantity)
                setUserLogged(isUserLoggedIn())

                const user = await retrieveUser()
                setUser(user)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }
    useEffect(() => {
        refreshData()
    }, [editModal])

    const onBackClick = () => {
        if (from.includes("login") || from.includes("addMeal")) navigate('/')
        else navigate(from)
    }

    const onSendMessageButton = (event: React.SyntheticEvent) => {
        alert('🛠️ Feature coming soon! Please, be patient')
    }

    const increaseCounter = () => {
        if (mealCounter === Number(mealStock)) {
            toast('There is not sufficient stock for adding more meals', 'error')

            return
        }
        setMealCounter(mealCounter + 1)
        const sum = Number(meal?.price) * (mealCounter + 1)
        setCounterButtonLabel(sum.toString())
    }

    const decreaseCounter = () => {
        setMealCounter(mealCounter === 0 ? 0 : mealCounter - 1)
        const sum = Number(meal?.price) * (mealCounter - 1)
        setCounterButtonLabel(sum.toString())
    }

    const onAddToCart = () => {
        if (!userLogged) {
            const currentPath = window.location.pathname
            navigate('/login', { state: currentPath })
        } else {
            (async () => {
                try {
                    loaderOn()
                    await addMealToCart(meal!.id, mealCounter)
                    setTimeout(() => {
                        loaderOff()
                        navigate(from)
                        toast('Meals added to cart!', 'success')
                        setMealCounter(0)
                        setCounterButtonLabel(meal?.price)
                    }, 500)

                } catch (error: any) {
                    handleErrors(error)
                }
            })()
        }
    }

    const toggleOpenCategory = (category: string) => {
        setOpenCategory(category !== openCategory ? category : "")
    }

    const onOptionsClick = () => {
        setContextualModal(true)
    }

    const closeContextualMenu = () => {
        setContextualModal(false)
    }

    const openEditModal = () => {
        setEditModal(true)
        setContextualModal(false)
    }

    const closeEditModal = () => {
        setEditModal(false)
    }

    const saveEdit = () => {
        setEditModal(false)
        toast('Meal updated!', 'success')
    }

    const openDeleteModal = () => {
        setDeleteModal(true)
        setContextualModal(false)
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
        setContextualModal(false)
    }

    const saveDelete = () => {
        loaderOn()
        setTimeout(() => {
            navigate("/profile")
            loaderOff()
            toast('Meal deleted!', 'success')
        }, 800);
    }

    const toggleLikeChefHandler = () => {
        (async () => {
            try {
                await toggleLikeChef(meal!.author.id)
                refreshData()
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    const ownMeal = meal?.author.id === userId
    return <>
        {deleteModal && <DeleteModal mealId={mealId!} handleClose={closeDeleteModal} onDelete={saveDelete} />}
        {editModal && <EditMeal mealId={mealId!} onUpdateMeal={saveEdit} onCancelEditMeal={closeEditModal} />}
        {contextualModal && <>
            <div className='contextualModal-overlay' onClick={closeContextualMenu}></div>
            <ContextualModalMenu >
                <>
                    <Link label='Edit meal' state='default' icon={<PencilSquareIcon className='icon-xs grey-700' />} onClick={openEditModal} />
                    <Link label='Mark as out of stock' state='default' icon={<XMarkIcon className='icon-xs grey-700' />} />
                    <Link label='Delete meal' state='critical' icon={<TrashIcon className='icon-xs critical-color' />} onClick={openDeleteModal} />
                </>
            </ContextualModalMenu>
        </>}
        <Topbar level='second' secondLevel={{ label: "Meal detail", left: <ArrowLeftIcon className='icon-s grey-700' />, onLeftClick: onBackClick, right: ownMeal && <EllipsisVerticalIcon className='icon-s grey-700' />, onRightClick: onOptionsClick }} />
        <div className='page-first-level' style={{ overflow: contextualModal === true ? 'hidden' : 'auto', paddingBottom: meal?.author.id !== userId ? '110px' : '24px' }}>

            {!meal && <div className='meal-details-spinner'><Spinner size='small' /></div>}
            {/* upper-part */}
            <div className='meal-detail-upper-part'>
                {/* image-carousel */}
                {meal &&
                    <div className='img-slider-container'>
                        {meal && meal.quantity < 4 && <div className='meal-detail-left-remaining'>
                            {meal.quantity > 0 ?
                                <p className='small-text white'>Hurry up! Only <b>{meal.quantity}</b> left!</p>
                                :
                                <p className='small-text white'>No stock left, just sold out!</p>
                            }
                        </div>}
                        <Carousel slide slideInterval={400000} leftControl={" "} rightControl={" "}>
                            {meal.images.map(image => <img src={image} className='meal-detail-img' />)}
                        </Carousel>
                    </div>}

                {/* image-info */}
                <div className='meal-detail-img-info'>

                    {/* categories */}
                    <div className='meal-detail-img-info-categ'>
                        {meal && meal.categories.length > 0 && meal.categories.map((category: string) => <CategoryInteractive category={category} open={category === openCategory} onClick={() => toggleOpenCategory(category)} />)}
                    </div>

                    {/* counter - actionButton */}
                    <div className='meal-detail-img-info-counter'>
                        {meal && meal?.author.id !== userId ? <>
                            <IconButton icon={<MinusIcon className='icon-s grey-700' />} type={'secondary'} onClick={decreaseCounter} />
                            <p className='heading-l meal-detail-counter-label'>{mealCounter}</p>
                            <IconButton icon={<PlusIcon className='icon-s grey-700' />} type={'secondary'} onClick={increaseCounter} />
                        </> : ""}
                    </div>

                </div>
            </div>

            {/* lower-part */}
            {meal && <Header text={meal.title} />}
            <div className='meal-detail-lower-part'>
                {meal && <DataItem label='Description' content={meal.description} />}
                {meal && <DataItem label='Ingredients' content={meal.ingredients.join(", ")} />}
                {meal && <DataItem label='BestBefore' content={`${meal.bestBefore} days`} />}
                {meal && <DataItem label='Price' content={`${meal.price}€`} />}
                {meal && <Divider width='100%' />}
                {meal && user && <ChefModule avatar={meal.author.avatar} name={meal.author.name} liked={user.likedChefs.includes(meal.author.id)} onSendMessage={onSendMessageButton} onLikeChef={toggleLikeChefHandler} />}
            </div>
        </div>
        {meal?.author.id !== userId && <ButtonBar firstButton={{ label: mealCounter === 0 ? `Add to cart` : `Add ${mealCounter} to cart - ${counterButtonLabel}€`, onClick: onAddToCart }} />}
    </>
}