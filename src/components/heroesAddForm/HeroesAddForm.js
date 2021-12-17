import { useState, useEffect } from "react";
import {useHttp} from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux';

import { heroAdd, heroesFetchingError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const {heroes, selectedFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    console.log(selectedFilter);
    const onValueChange = (e) => {
        e.preventDefault();

        const createdHero = {
            id: uuidv4(),
            name, 
            description,
            element
        }

        const newHeroes = [...heroes, createdHero];

        dispatch(heroAdd(newHeroes));

        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(createdHero))
            .catch(() => dispatch(heroesFetchingError()))

        console.log(newHeroes);  
    }
    
    const [filters, setFilters] = useState([]);
    

    useEffect(() => {
        request(`http://localhost:3001/filters`)
            .then(data => setFilters(data.splice(1, 4)))
            .catch(() => dispatch(heroesFetchingError()))
            // eslint-disable-next-line
    }, []);

    const options = filters.map((item, i) => {
        return (
            <option key={i} value={item.name}>{item.label}</option>
        )
    })

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onValueChange}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={(e) => {setElement(e.target.value)}}>
                    <option >Я владею элементом...</option>
                    {options} 
                    {/* <option >Я владею элементом...</option>
                    <option value={filters[0]}>Огонь</option>
                    <option value={filters[2]}>Вода</option>
                    <option value={filters[3]}>Ветер</option>
                    <option value={filters[4]}>Земля</option> */}
                    
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;