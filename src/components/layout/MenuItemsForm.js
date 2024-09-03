import { ImageUpload } from './ImageUpload';
import { InputField } from './InputField';
import { useEffect, useState } from "react";
import MenuItemPriceProps from './MenuItemPriceProps';


export default function MenuItemForm({ itemImage, onImageChange, onSubmit, menuItem }) {

    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);


    return (
        <form onSubmit={ev =>
            onSubmit(ev, {

                itemImage, name, description, basePrice, sizes, extraIngredientPrices

            })} className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4" style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <ImageUpload itemImage={itemImage} onImageChange={onImageChange} />
                <div className="grow">
                    <InputField label="Item name" value={name} onChange={ev => setName(ev.target.value)} />
                    <InputField label="Description" value={description} onChange={ev => setDescription(ev.target.value)} />
                    <InputField label="Base Price" value={basePrice} onChange={ev => setBasePrice(ev.target.value)} />
                    <MenuItemPriceProps
                        name={'Sizes'}
                        addLabel={'Add item size'}
                        props={sizes}
                        setProps={setSizes} />
                    <MenuItemPriceProps
                        name={'Extra Ingredients'}
                        addLabel={'Add ingredients prices'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices} />
                    <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">Save</button>
                </div>
            </div>
        </form>
    );
}