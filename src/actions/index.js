export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDelete = (heroes) => {
    return {
        type: 'HERO_DELETE',
        payload: heroes
    }
}

export const heroAdd = (newHero) => {
    return {
        type: 'HERO_ADD',
        payload: newHero
    }
}

/* export const filterHeroes = (filteredHeroes) => {
    return {
        type: 'HEROES_FILTERED',
        payload: filteredHeroes
    }
} */

export const selectFilter = (selectedFilter) => {
    return {
        type: 'HEROES_FILTER',
        payload: selectedFilter
    }
}