import './Search.css'
import Topbar from '../library/modules/Topbar'
import Tabbar from '../library/modules/Tabbar'
import Header from '../library/components/Header'
import SearchBar from '../library/components/SearchBar'
import CategorySelector from '../library/components/CategorySelector'
import { useEffect, useState } from 'react'
import searchMeals from '../logic/searchMeals'
import useHandleError from '../logic/hooks/useHandleError'
import MealCard from '../library/modules/MealCard'
import Skeleton from 'react-loading-skeleton'
import useAppContext from '../logic/hooks/useAppContext'
import EmptyState from '../library/components/EmptyState'

type Meal = {
    author: { avatar: string, name: string, description: string, id: string },
    images: Array<string>,
    title: string,
    description: string,
    ingredients: string[],
    bestBefore: string,
    price: string,
    categories: Array<string>,
    _id: string,
    quantity: number
}

export default function Search() {
    const [searchQuery, setSearchQuery] = useState<string | undefined>()
    const [categories, setCategories] = useState<string[]>([])
    const [result, setResult] = useState<Meal[] | null>()

    const handleErrors = useHandleError()
    const { loaderOn, LoaderOff, navigate } = useAppContext()


    useEffect(() => {
        const delayId = setTimeout(() => {
            (async () => {
                try {
                    const meals = await searchMeals(searchQuery, categories)
                    setResult(meals)
                } catch (error: any) {
                    handleErrors(error)
                }
            })()
        }, 800)


        return () => clearTimeout(delayId)

    }, [searchQuery, categories])

    const onCategoryClick = (category: string) => {
        if (categories && categories.includes(category)) {
            const updatedArray = categories.filter(item => item !== category)
            setCategories(updatedArray)
        }
        else setCategories(categories.concat(category))
    }

    const onMealCard = (mealId: string) => {
        const currentPath = window.location.pathname
        navigate(`/meal/${mealId}`, { state: currentPath })
    }

    return <>
        <Topbar level={'first'} firstLevel={{ label: "Search", chat: true, onChatClick: () => alert('🛠️ Feature coming soon! Please, be patient') }} />
        <div className="page-first-level">

            <SearchBar setSearchQuery={setSearchQuery} />

            {/* SEARCH CATEGORIES */}
            <div className="search-meal-categories">
                <div className="search-meal-categories-pair">
                    <CategorySelector category="vegan" onClick={() => onCategoryClick("vegan")} selected={categories.includes("vegan") && true} />
                    <CategorySelector category="gluten" onClick={() => onCategoryClick("gluten")} selected={categories.includes("gluten") && true} />
                </div>
                <div className="search-meal-categories-pair">
                    <CategorySelector category="vegetarian" onClick={() => onCategoryClick("vegetarian")} selected={categories.includes("vegetarian") && true} />
                    <CategorySelector category="alergen" onClick={() => onCategoryClick("alergen")} selected={categories.includes("alergen") && true} />
                </div>
            </div>

            {/* SEARCH RESULTS */}
            <div className="meals-list">
                {result?.length === 0 && result !== null && <div className="empty-state-cart"><EmptyState src="/illustrations/NoResults.png" title="No meals found" description="Try adjusting the search criteria" width="240px" /> </div>}
                {result && result.map((meal: Meal) => {
                    return <MealCard key={meal._id} meal={{
                        image: meal.images[0],
                        title: meal.title,
                        description: meal.description,
                        categories: meal.categories ? meal.categories : [],
                        price: meal.price
                    }} onclick={() => onMealCard(meal._id)} />
                })}


            </div>
        </div>
        <Tabbar search={true} />
    </>
}