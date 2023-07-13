import { routes } from "../../helpers/routes"

export const Skeleton = ({imgPath}) => {
    return <div className="text-center">
        <img src={`${routes.root}/images/${imgPath}`} alt="placeholder"/>
        <h2>Your data will be here soon</h2>
    </div>
}