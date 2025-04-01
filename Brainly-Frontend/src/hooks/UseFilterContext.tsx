import { createContext, ReactNode, useContext, useState } from "react";

// creating a context provider for the filter types so that we can use it in the sidebar and the content component as a whole, it helps in in reducing the prop drilling and writing redundant code and also helps in managing the states of the filterTypes in a single place.

interface FilterContentType {
    activeFilter: string;
    setActiveFilter: (filter: string) => void
}

// the context is created to hold the filter type and the function to set the filter type for the children components
const FilterContext = createContext<FilterContentType | undefined>(undefined);

export function FilterProvider({ children }: {children: ReactNode }){
    const [activeFilter, setActiveFilter] = useState<string>('all');

    return (
        <FilterContext.Provider value={{ activeFilter, setActiveFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter(){
    const context = useContext(FilterContext);
    if( context === undefined) throw new Error(`the place/component where useFilter is used must be inside the FilterProvider`)
    return context;
}