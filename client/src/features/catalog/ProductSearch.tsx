import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../App/store/configureStore";
import { setProductParams } from "./CatalogSlice";

const ProductSearch = () => {
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm,setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)

	return <TextField 
                label="Search products" 
                variant="outlined" 
                fullWidth 
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
            />;
};

export default ProductSearch;
