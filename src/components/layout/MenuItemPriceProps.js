import { useEffect, useState } from "react";
import Trash from './../icons/Trash';

import Plus from './../icons/Plus';

import ChevronDown from './../icons/ChevronDown';
import ChevronUP from './../icons/ChevronUp';
export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }]
        })
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(preveSizes => {
            const newSized = [...preveSizes];
            newSized[index][prop] = newValue;
            return newSized;
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }
    return (
        <div className='bg-gray-200 p-2 rounded-md mb-2'>
            <button
                onClick={() => setIsOpen(prev => !prev)} //isOpen
                className="inline-flex p-1 border-0 justify-start "
                type="button">
                {isOpen && (
                    <ChevronUP />
                )}
                {!isOpen && (
                    <ChevronDown />
                )}

                <span>{name} </span>
                <span>({props?.length}) </span>
            </button>

            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className='flex items-end gap-2'>
                        <div>
                            <label>Name</label>
                            <input type='text'
                                placeholder='Size name'
                                value={size.name}
                                onChange={(ev) => editProp(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra Price</label>
                            <input type='text'
                                placeholder='Extra price'
                                value={size.price}
                                onChange={(ev) => editProp(ev, index, 'price')}
                            />
                        </div>
                        <div>
                            <button className='bg-white mb-2 px-2'
                                type='button'
                                onClick={() => removeProp(index)}>
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={addProps}
                    className='bg-white items-center'>
                    <Plus className='w-4 h-4' />
                    <span>{addLabel}</span>

                </button>
            </div>

        </div>
    );
}