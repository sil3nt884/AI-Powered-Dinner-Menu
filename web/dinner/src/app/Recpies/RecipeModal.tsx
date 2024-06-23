'use client'
import {RecipeData} from "../../../../../server/routes/getRecipes";
import {useEffect, useState} from "react";


export default function RecipeModal({recipe, isOpen}:  {recipe: RecipeData,  isOpen: boolean}) {
    const [isHidden, setHidden] = useState(false)

    useEffect(() => {
        if(!isOpen) {
            setHidden(true)

        }
    }, [isOpen])

    if (!isOpen) {
        return null;
    }



    return  <div className={`fixed z-10 inset-0 overflow-y-auto ${isHidden ? 'hidden': ''}`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            {/* Trick to center modal */}
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                            <p className="text-blue-500 underline"><a onClick={(e) =>  e.stopPropagation()} target={'_blank'} href={recipe.url}>Recipe Link</a></p>
                            <h3 className="mt-2 text-lg leading-6 font-medium text-gray-900">Tesco Links:</h3>
                            <ul className="list-disc list-inside text-sm leading-5 text-gray-500 mt-2">
                                {recipe.searchQueries.map((query, index) => {
                                    const url = new URL(query);
                                    const params = new URLSearchParams(url.search);
                                    const queryParam = params.get('query');
                                    return (
                                        <li key={index} className="underline text-blue-500">
                                            <a onClick= {(e) =>  e.stopPropagation()} target={'_blank'} href={query}>{queryParam}</a>
                                        </li>
                                    )}
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
