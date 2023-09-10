import './CategoryInteractive.css'
import CategoryEmoji from "./CategoryEmoji"


type Props = {
    category: string,
    open: boolean,
    onClick: () => void
}


export default function CategoryInteractive({ category, open, onClick }: Props) {
    return <>
        <div className={`category-interactive-container 
        ${category == "vegetarian" && "category-interactive-vegetarian"}
        ${category == "gluten" && "category-interactive-gluten"}
        ${category == "vegan" && "category-interactive-vegan"}
        ${category == "alergen" && "category-interactive-alergen"}`}
            style={{ paddingRight: open ? "8px" : "6px" }}
            onClick={onClick!}>

            {/* <div className='category-interactive-icon-container'> */}
            {category === "vegetarian" && <CategoryEmoji category={"vegetarian"} width="24px" height="24px" />}
            {category === "gluten" && <CategoryEmoji category={"gluten"} width="24px" height="24" />}
            {category === "vegan" && <CategoryEmoji category={"vegan"} width="24px" height="24px" />}
            {category === "alergen" && <CategoryEmoji category={"alergen"} width="24px" height="24px" />}
            {/* </div> */}

            {open && <p className={`small-text-bold
            ${category == "vegetarian" && "category-interactive-label-vegetarian"}
            ${category == "gluten" && "category-interactive-label-gluten"}
            ${category == "vegan" && "category-interactive-label-vegan"}
            ${category == "alergen" && "category-interactive-label-alergen"}
            `}>{`
        ${category === "vegetarian" ? "Vegetarian" : ''}
        ${category === "gluten" ? "Gluten-free" : ''}
        ${category === "vegan" ? "Vegan" : ''}
        ${category === "alergen" ? "Non-alergens" : ''}`}</p>}
        </div>
    </>
}