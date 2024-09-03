'use client';
import { useState, useEffect } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from './../../components/useProfile';
import toast from "react-hot-toast";
export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('')
    const [categorias, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);
    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName };
            if (editedCategory) {
                data._id = editedCategory._id
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setCategoryName('')
            fetchCategories();
            setEditedCategory(null);
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        });
        await toast.promise(creationPromise, {
            loading: editedCategory
                ? 'Updating Category...'
                : 'Creating your new category...',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: 'Error creating new category'
        });
    }

    async function handleDeleteClick(_id){
        console.log(_id)
        const promise = new Promise(async(resolve, reject) =>{
            const response = await fetch('/api/categories?_id='+_id,{
                method: 'DELETE',
                
            });
            if(response.ok){
                resolve();
            }else {
                reject();
            }
        });

        await toast.promise(promise,{
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error deleting category'
        });
        fetchCategories();

    }

    if (profileLoading) {
        return 'Loading user Info...'
    }
    if (!profileData) {
        return 'Not admin'
    }
    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>:<b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                            value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <button
                            className="border border-primary" type="submit">
                            {editedCategory ? 'update' : 'create'}
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing Categories:</h2>
                {categorias?.length > 0 && categorias.map(c => (
                    <div

                        className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1">
                        <div
                            className=" grow">
                            {c.name}
                        </div>
                        <div className="flex gap-2 ">
                            <button type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                }}
                            >Edit
                            </button>
                            <button 
                            onClick={()=> handleDeleteClick(c._id)}
                            type="button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}