import "./CategoryIcon.css"
import CategoryEmoji from "./CategoryEmoji"


type Props = {
    category: string
}

export default function CategoryIcon({ category, ...props }: Props): JSX.Element {

    return <>
        <div className={`category-icon-container 
                ${category == "vegetarian" && "category-vegetarian"}
                ${category == "gluten" && "category-gluten"}
                ${category == "vegan" && "category-vegan"}
                ${category == "alergen" && "category-alergen"}`}{...props}>

            {category === "vegetarian" && <CategoryEmoji category={"vegetarian"} width="14px" height="14px" />}
            {category === "gluten" && <CategoryEmoji category={"gluten"} width="14px" height="14" />}
            {category === "vegan" && <CategoryEmoji category={"vegan"} width="14px" height="14px" />}
            {category === "alergen" && <CategoryEmoji category={"alergen"} width="14px" height="14px" />}
        </div>
    </>
}