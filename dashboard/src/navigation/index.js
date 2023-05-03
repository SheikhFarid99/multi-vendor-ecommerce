import { allNav } from './allNav'
export const getNavs = (role) => {
    const finalNavs = [];

    for (let i = 0; i < allNav.length; i++) {
        if (role === allNav[i].role) {
            finalNavs.push(allNav[i])
        }
    }
    return finalNavs
}