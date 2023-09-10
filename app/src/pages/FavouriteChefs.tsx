import Topbar from "../library/modules/Topbar"
import useAppContext from "../logic/hooks/useAppContext"
import { ArrowLeftIcon } from "../library/icons"
import Header from "../library/components/Header"
import FavouriteChefModule from "../library/modules/FavouriteChefModule"
import { useEffect, useState } from "react"
import useHandleError from "../logic/hooks/useHandleError"
import retrieveUser from "../logic/retrieveUser"
import retrieveLikedChefs from "../logic/retrieveLikedChefs"
import Skeleton from "react-loading-skeleton"

type User = {
    name: string,
    availability: Array<object>,
    avatar: string,
    username: string,
    description: string,
    tags: string[],
    likedChefs: Array<User>
}

export default function FavouriteChefs({ }) {
    const { loaderOn, loaderOff, navigate } = useAppContext()
    const handleErrors = useHandleError()

    const [chefs, setChefs] = useState<Array<User>>()

    useEffect(() => {
        (async () => {
            try {
                const chefs = await retrieveLikedChefs()
                setChefs(chefs)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }, [])

    const onBackClick = () => navigate(-1)
    return <>
        <Topbar level='second' secondLevel={{ left: <ArrowLeftIcon className='icon-s grey-700' />, onLeftClick: onBackClick }} />
        <div className="page-first-level">
            <Header text={'Favourite chefs'} />
            {!chefs && <Skeleton count={4} width={'100%'} height={'80px'} baseColor="#f4f4f4" highlightColor="#eeeeee" className="meals-profile-skeleton" />}
            {chefs?.map((chef, index) => {
                return <FavouriteChefModule avatar={chef.avatar} name={chef.name} description={chef.description} divider={index !== chefs.length - 1} />
            })}
        </div>
    </>
}