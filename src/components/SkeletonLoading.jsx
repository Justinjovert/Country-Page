import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoading = ({ ...props }) => {

    const [color, setColor] = useState('#E0E0E0')

    useEffect(() => {
        try {
            const darkMode = localStorage.getItem('isDark');
            if (darkMode === 'true') {
                setColor("#282b30");
            } else {
                setColor("#E0E0E0");
            }
        } catch (error) {
            //
        }
    }, [])

    return (
        <Skeleton {...props} baseColor={color} highlightColor={color} />
    )
}

export default SkeletonLoading