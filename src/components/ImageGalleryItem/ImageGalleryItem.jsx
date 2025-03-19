import css from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem ({data, onChangeModal})  {
        
    const onGetValue = (e) => {
        const src = e.target.src
        const alt = e.target.alt;
        const value = {
            src,
            alt,
        };

        onChangeModal(value);
    }
         

        return (
            data.map((el, i) => {
                return <li
                    className={css.ImageGalleryItem}
                    key={i}>
                    <img
                        onClick={onGetValue}
                        data={el.webformatURL}
                        className={css.ImageGalleryItemImage}
                        src={el.webformatURL} alt={el.tags} />
                </li>  
            }));

};


