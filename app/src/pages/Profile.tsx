import { useState, useEffect } from "react";
import logoutUser from "../logic/logoutUser";
import './Profile.css'
import Topbar from "../library/modules/Topbar";
import Tabbar from "../library/modules/Tabbar";
import Avatar from "../library/components/Avatar";
import { ArrowRightOnRectangleIcon, ChevronRightIcon, Cog6ToothIcon, CubeIcon, HeartIcon, PencilIcon, PencilSquareIcon, UserIcon } from "../library/icons";
import Divider from "../library/components/Divider";
import Tabs from "../library/components/Tabs";
import retrieveUser from "../logic/retrieveUser";
import MealCard from "../library/modules/MealCard";
import retrieveOwnMeals from "../logic/retrieveOwnMeals";
import useAppContext from "../logic/hooks/useAppContext";
import useHandleError from "../logic/hooks/useHandleError";
import retrievePendingToDeliver from "../logic/retrievePendingToDeliver";
import PendingToPackCard from '../library/modules/PendingToPackCard'
import EmptyState from "../library/components/EmptyState";
import retrieveWaitingToPickUp from "../logic/retrieveWaitingToPickUp";
import WaitingToDeliverCard from '../library/modules/WaitingToDeliverCard'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type User = {
    name: string,
    availability: Array<object>,
    avatar: string,
    username: string,
    description: string,
    tags: string[],
}

type Meal = {
    images: string[],
    title: string,
    description: string,
    categories: Array<string>,
    price: string,
    id: string
}


type MealOrder = {
    meal: Meal[];
    quantity: number;
}

type Order = {
    serial: string;
    meals: MealOrder[];
    buyer: User;
    status: string;
}


export default function Profile(): JSX.Element {
    const { loaderOn, loaderOff, navigate } = useAppContext()
    const handleErrors = useHandleError()

    const [meals, setMeals] = useState<Array<Meal> | null>(null)
    const [user, setUser] = useState<User>()

    const [tabView, setTabView] = useState('myProducts')

    const [pendingToPack, setPendingToPack] = useState<Order[]>()

    const [pendingToDeliver, setPendingToDeliver] = useState<Order[]>()

    const refreshMeals = () => {
        (async () => {
            try {
                const user = await retrieveUser()
                setUser(user)

                const meals = await retrieveOwnMeals()
                setMeals(meals)

                const pendingToPack = await retrievePendingToDeliver()
                setPendingToPack(pendingToPack)

                const waitingToPickUp = await retrieveWaitingToPickUp()
                setPendingToDeliver(waitingToPickUp)

            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    useEffect(() => {
        refreshMeals()
    }, [])

    const onMealCard = (id: string) => {
        const currentPath = window.location.pathname
        navigate(`/meal/${id}`, { state: currentPath })
    }

    const inLoggoutClick = () => {
        loaderOn()
        setTimeout(() => {
            logoutUser()
            loaderOff()
            navigate('/login')
        }, 1000)
    }

    const toggleTabView = () => {
        if (tabView === 'myProducts') setTabView('toPack')
        else setTabView('myProducts')
        refreshMeals()
    }

    const onMealsTab = () => {
        setTabView('myProducts')
        refreshMeals()
    }

    const onPackTab = () => {
        setTabView('toPack')
        refreshMeals()
    }

    const onDeliverTab = () => {
        setTabView('toDeliver')
        refreshMeals()
    }

    return <>

        {user ? <Topbar level={'first'} firstLevel={{ label: `@${user?.username}`, chat: true, onChatClick: () => alert('🛠️ Feature coming soon! Please, be patient') }} /> : <Skeleton width={'250px'} count={1} height={'16px'} className="profile-topbar-skeleton" />}
        <div className="page-first-level">
            <div className="profile-first-part">
                {user ? <Avatar image={user.avatar} width={"60px"} className="profile-avatar" /> : <Skeleton width={'60px'} height={'60px'} baseColor="#f4f4f4" highlightColor="#eeeeee" />}
                {user ? <div className="profile-info">
                    <p className="title gre-700">{user.name}</p>
                    <p className="tiny-text grey-400">{user.description}</p>
                    <p className="tiny-text grey-400 italic">{user.tags.join(', ')}</p>
                </div> : <Skeleton count={3} containerClassName="flex-1" />}
            </div>
            <div className="profile-second-part">

                <div className="profile-opt" onClick={() => navigate('/favouriteChefs')}>
                    <div className="profile-opt-label">
                        <HeartIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">My favourites</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>
                <Divider width="100%" />

                <div className="profile-opt" onClick={() => alert('🛠️ Feature coming soon! Please, be patient')}>
                    <div className="profile-opt-label">
                        <CubeIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">Past orders</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>
                <Divider width="100%" />

                <div className="profile-opt" onClick={() => alert('🛠️ Feature coming soon! Please, be patient')}>
                    <div className="profile-opt-label">
                        <PencilSquareIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">Edit profile</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>
                <Divider width="100%" />

                <div className="profile-opt" onClick={inLoggoutClick}>
                    <div className="profile-opt-label" >
                        <ArrowRightOnRectangleIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">Log out</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>

            </div>
            <div className="profile-third-part">
                <Tabs items={[
                    {
                        label: "Meals",
                        selected: tabView === 'myProducts',
                        onClick: onMealsTab
                    },
                    {
                        label: "Pack",
                        selected: tabView === 'toPack',
                        onClick: pendingToPack?.length === 0 ? null : onPackTab,
                        disable: pendingToPack?.length === 0
                    },
                    {
                        label: "Deliver",
                        selected: tabView === 'toDeliver',
                        onClick: pendingToDeliver?.length === 0 ? null : onDeliverTab,
                        disable: pendingToDeliver?.length === 0
                    }
                ]} />

                <div className="profile-meals-list">
                    {tabView === 'myProducts' && !meals && <Skeleton count={3} containerClassName="flex-1" height={'110px'} className="meals-profile-skeleton" baseColor="#f4f4f4" highlightColor="#eeeeee" />}
                    {tabView === 'myProducts' && meals && meals.map((meal: Meal) => {
                        return <MealCard key={meal.id} meal={{
                            image: meal.images[0],
                            title: meal.title,
                            description: meal.description,
                            categories: meal.categories ? meal.categories : [],
                            price: meal.price
                        }} onclick={() => onMealCard(meal.id)} />
                    })}

                    {meals && meals.length === 0 && <div className="empty-state-profile"><EmptyState src="/illustrations/sadCloud.png" title="No meals created yet!" description="Add meals to start experiencing Yuper!" width="240px" marginBottom="-32px" /> </div>}

                    {/* PENDING TO PACK */}
                    {tabView === 'toPack' && pendingToPack && pendingToPack.map((item: Order) => {
                        // @ts-ignore
                        return <PendingToPackCard buyer={item.buyer.name} meals={item.meals} serial={item.serial} chipLabel={item.status} chipStatus={item.status === 'pending' ? 'warning' : 'success'} onReadyButton={onDeliverTab} />
                    })
                    }

                    {/* PENDING TO DELIVER */}
                    {tabView === 'toDeliver' && pendingToDeliver && pendingToDeliver.map((item: Order) => {
                        // @ts-ignore
                        return <WaitingToDeliverCard buyer={item.buyer.name} meals={item.meals} serial={item.serial} chipLabel={item.status} chipStatus={'success'} />
                    })
                    }
                </div>
            </div>
        </div>
        <Tabbar profile={true} />
    </>
}