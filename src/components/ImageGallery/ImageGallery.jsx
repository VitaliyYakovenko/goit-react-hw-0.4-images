import {useState, useEffect } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import getImg from "rest-api/rest-api";
import css from "./ImageGallery.module.css";
import Button from "components/Button/Button";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Modal from "components/Modal/Modal";


export default function ImageGallery({ params }) {

    const [images, setImages] = useState([]);
    const [status, setStatus] = useState("idle");
    const [total, setTotal] = useState("");
    const [page, setPage] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalValue, setModalValue] = useState(null);
 

    useEffect(() => {
        if (params === "") return;

        reset();
        setStatus("pending");

        getImg(params).then(data => {
            setImages(data.hits);
            setTotal(data.totalHits);
            setStatus("success")
        }).catch(() =>  setStatus("error"));
       
    }, [params]);

  
    useEffect(() => { 
        if (params === "") return;

        if (page > 1) {
            setStatus("pending");

            getImg(params, page).then(data => {
                setImages(prev => [...prev, ...data.hits]);
                setStatus("success")
            }).catch(() => setStatus("error"));
        };

    }, [page, params, total]);

    useEffect(() => {
        if (images.length > 0) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [images]);



    const reset = () => {
        setImages([]);
        setPage(1);
        setStatus("pending");
    };

    

    const incrementPage = () => {
        setPage(prev => prev + 1);
    };
   
    const onOpenModal = (value) => {
        setIsOpenModal(true);
        setModalValue(value);
    }

    const onCloseModal = (value) => {
        setModalValue(value);
        setIsOpenModal(false);
    }
         
    
    if (status === "error" || total === 0) {
            return (<p className={css.ErrorMesage}>Please try to enter another word</p>)
    };
         

    if (status === "success" && total <= 20) {
        return (<>
            {isOpenModal
                ? <Modal value={modalValue} onClose={onCloseModal}/>
                : <></>
            }
            <ul className={css.ImageGallery}>
                <ImageGalleryItem data={images} />
            </ul>
        </>);
    };

    if (total <= images.length) {
        return (<>
             {isOpenModal
                ? <Modal value={modalValue} onClose={onCloseModal}/>
                : <></>
            }
            <ul className={css.ImageGallery}>
                <ImageGalleryItem
                    data={images}
                    onChangeModal={onOpenModal} />
            </ul>
        </>);
    }

    if (status === "success" && total > 20) {
        return (<>
            <ul className={css.ImageGallery}>
                <ImageGalleryItem
                data={images}
                onChangeModal={onOpenModal}
                />
            </ul>
            {status === "pending"
                ? <LoadingSpinner />
                : <Button updatePage={incrementPage} />}
            {isOpenModal
                ? <Modal value={modalValue} onClose={onCloseModal} />
                : <></>
             }
        </>);
    };
};

  

    














