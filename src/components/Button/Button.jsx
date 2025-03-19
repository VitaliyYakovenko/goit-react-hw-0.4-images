import { useState } from "react";
import css from "./Button.module.css";

export default function Button({updatePage}) {

    const [currentPage, setCurrentPage] = useState(1);

    const onUpdatePage = () => {
        setCurrentPage(prev => prev + 1);
        updatePage(currentPage);
    };

  
        return (<button onClick={onUpdatePage}
            className={css.Button}
            type="button">
            Load More
        </button>);
    
};

