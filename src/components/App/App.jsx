import { useState } from "react";
import Searchbar from "components/Searchbar/Seachbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import  css  from "./App.module.css";


export default function App() {
  const [query, setQuery] = useState("");
 
  const getQuery = (value) => {

    setQuery(value);
  };
 



  return (
    <div className={css.app}>
      <Searchbar
        getValue={getQuery} />
      <ImageGallery params={query} />
    </div>);

};
