import { useEffect, useState } from "react"
import Topbar from "../library/modules/Topbar"
import Tabbar from "../library/modules/Tabbar"
import NavigationRow from "../library/components/NavigationRow"
import { AdjustmentsVerticalIcon, ChevronRightIcon } from "../library/icons"
import Header from "../library/components/Header"
import IconButton from "../library/components/IconButton"
import './Home.css'
import retrieveMeals from "../logic/retrieveMeals"
import MealCard from "../library/modules/MealCard"
import retrieveUser from "../logic/retrieveUser"
import useAppContext from "../logic/hooks/useAppContext"
import useHandleError from "../logic/hooks/useHandleError"
import EmptyState from "../library/components/EmptyState"
import FakeSearchBar from "../library/components/FakeSearchBar"
import Spinner from "../library/components/Spinner"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type User = {
    name: string,
    availability: Array<object>
}

type Meal = {
    images: string[],
    title: string,
    description: string,
    categories: Array<string>,
    price: string,
    id: string
}

export default function Home() {
    const { loaderOn, LoaderOff, navigate } = useAppContext()
    const handleErrors = useHandleError()

    const [meals, setMeals] = useState<Array<Meal>>()
    const [user, setUser] = useState<User>()

    useEffect(() => {
        (async () => {
            try {
                const meals = await retrieveMeals()
                const user = await retrieveUser()
                setMeals(meals)
                setUser(user)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }, [])

    const onCompleteProfile = () => {
        navigate('additionalInfo')
    }

    const onMealCard = (id: string) => {
        const currentPath = window.location.pathname
        navigate(`/meal/${id}`, { state: currentPath })
    }

    const onFilterClick = () => {
        alert('🛠️ Feature coming soon! Please, be patient')
    }

    return <>
        <Topbar level={'first'} firstLevel={{ onChatClick: () => alert('🛠️ Feature coming soon! Please, be patient') }} />
        <div className="page-first-level">
            {/* <Header text={`Welcome to Yupper`} /> */}
            <FakeSearchBar onBarClick={() => navigate('/search')} />

            {user && user.availability.length === 0 && <NavigationRow className="home-navigation-row" label={"Complete your profile"} trailingIcon={<ChevronRightIcon className='icon-s primary-color' />} onClick={onCompleteProfile} container="border" />}

            <div className="list-header">
                <p className="heading-s grey-700">Meals near you</p>
                <IconButton icon={<AdjustmentsVerticalIcon className="icon-s grey-700" />} type={'secondary'} onClick={onFilterClick} />
            </div>
            <div className="meals-list">
                {!meals && <Skeleton count={3} containerClassName="flex-1" height={'110px'} className="meals-profile-skeleton" baseColor="#f4f4f4" highlightColor="#eeeeee" />}
                {meals && meals.map((meal: Meal) => {
                    return <MealCard key={meal.id} meal={{
                        image: meal.images[0],
                        title: meal.title,
                        description: meal.description,
                        categories: meal.categories ? meal.categories : [],
                        price: meal.price
                    }} onclick={() => onMealCard(meal.id)} />
                })}
                {meals?.length === 0 &&
                    <div className="empty-state-profile"><EmptyState src="/illustrations/noProducts.png" title="Congrats! You are the first one!" description="You are the first one arriving to Yuper. Do the honors and create your first meal!" width="240px" /> </div>}
            </div>
        </div>
        <Tabbar home={true} />
    </>
}