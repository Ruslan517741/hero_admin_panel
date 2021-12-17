
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useState, useEffect } from "react";
import {useHttp} from '../../hooks/http.hook';

import { useDispatch} from 'react-redux';

import { selectFilter, heroesFetchingError } from '../../actions';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [filterList, setFilterList] = useState([]);
    const [activeFilter, setActiveFilter] = useState(0);
    
    
    useEffect(() => {
        request(`http://localhost:3001/filters`)
            .then(data => setFilterList(data))
            .catch(() => dispatch(heroesFetchingError()))

        
            // eslint-disable-next-line
    }, []);

    /* heroes.filter(item => item.id !== id) */

    /* const createFilteredList = () => {
        const filteredList = heroes.filter(item => item.element === activeFilter.name)
        console.log(activeFilter.name);
        console.log(filteredList);
       

        dispatch(filterHeroes(filteredList))
        console.log(filterHeroesList);
    } */
    console.log(filterList)
    const filterButtons = filterList.map(item => {
        const {className, label, name} = item;
        let fullClassName;
        if (activeFilter === name) {
            fullClassName = `${className} active`;
        } else {
            fullClassName = className;
        }
        return (
            <button key={name} 
                    id={name} 
                    className={fullClassName} 
                    onClick={() => {setActiveFilter(name); dispatch(selectFilter(name))}}>
                    {label}
            </button>
        )
    })

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger ">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {filterButtons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;