import "./CategoryEmoji.css"
import { COCONUT, ALERGEN, AVOCADO, GLUTEN } from "../utils/categoryIcons"

type Params = {
    category: string,
    width: string,
    height: string
}

export default function CategoryEmoji({ category, width, height }: Params): JSX.Element {
    return <>
        <div className="category-emoji-container" >
            {category === "gluten" && <img style={{ width: `${width}`, height: `${height}` }} src={GLUTEN}></img>}
            {category === "vegetarian" && <img style={{ width: `${width}`, height: `${height}` }} src={`${AVOCADO}`}></img>}
            {category === "vegan" && <img style={{ width: `${width}`, height: `${height}` }} src={`${COCONUT}`}></img>}
            {category === "alergen" && <img style={{ width: `${width}`, height: `${height}` }} src={`${ALERGEN}`}></img>}
        </div >
    </>
}