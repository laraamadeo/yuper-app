import CategoryEmoji from "./CategoryEmoji"
import "./CategorySelector.css"


type Props = {
    category: string,
    onClick?: () => any,
    selected?: boolean
}

export default function CategorySelector({ category, selected, onClick }: Props): JSX.Element {


    return <>
        <div className={`category-selector-container 
                ${category == "vegetarian" && `category-selector-vegetarian ${selected && 'category-selector-vegetarian-selected'}`}
                ${category == "gluten" && `category-selector-gluten ${selected && 'category-selector-gluten-selected'}`}
                ${category == "vegan" && `category-selector-vegan ${selected && 'category-selector-vegan-selected'}`}
                ${category == "alergen" && `category-selector-alergen ${selected && 'category-selector-alergen-selected'}`}`} onClick={onClick}>


            {category === "vegetarian" && <CategoryEmoji category={"vegetarian"} width="32px" height="32px" />}
            {category === "gluten" && <CategoryEmoji category={"gluten"} width="32px" height="32" />}
            {category === "vegan" && <CategoryEmoji category={"vegan"} width="32px" height="32px" />}
            {category === "alergen" && <CategoryEmoji category={"alergen"} width="32px" height="32px" />}

            <p className={`body-text-bold
            ${category == "vegetarian" && "category-selector-label-vegetarian"}
            ${category == "gluten" && "category-selector-label-gluten"}
            ${category == "vegan" && "category-selector-label-vegan"}
            ${category == "alergen" && "category-selector-label-alergen"}
            `}>{`
                ${category === "vegetarian" ? "Vegetarian" : ''}
                ${category === "gluten" ? "Gluten free" : ''}
                ${category === "vegan" ? "Vegan" : ''}
                ${category === "alergen" ? "Non-alergens" : ''}`}</p>
        </div>
    </>
}