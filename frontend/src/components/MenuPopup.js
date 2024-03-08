
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useSelector } from "react-redux";


import { POST } from '../Setup/Api';
import CONSTANTS from '../Setup/Constants.json';
import CustomInputField from './FloatInputField';
import CustomTextArea from "./CustomTextArea";
import CustomPopup from "./CustomPopup";

export default function MenuPopup({ close, visible, getAllMenuItems, ...rest }) {

    const data = useSelector(_ => _.data);

    const [name, setName] = useState(data?.name ? data.name : '');
    const [price, setPrice] = useState(data?.price ? data.price : '');
    const [ingredients, setIngredients] = useState(data?.ingredients ? data.ingredients : '');

    useEffect(() => {
        setName(data?.name ? data.name : '');
        setPrice(data?.price ? data.price : '');
        setIngredients(data?.ingredients ? data.ingredients : '');
    }, [data]);


    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState('');
    const openPopup = async () => {
        setMessage('Are you sure you want to delete this item.');
        setPopup(true);
    }

    const addUpdateMenuItem = async () => {
        if (!name) {
            alert('Please enter a valid name!');
            return
        }

        if (!price) {
            alert('Please enter a price!');
            return
        }

        if (!ingredients) {
            alert('Please enter ingredients contained!');
            return
        }

        let data1;
        if (data?._id) {
            data1 = await POST(CONSTANTS.UPDATE_MENU_ITEM, { name, price, ingredients, _id: data._id });
        } else {
            data1 = await POST(CONSTANTS.ADD_MENU_ITEM, { name, price, ingredients });
        }
        if (data1) {
            alert(data1);
            close(false);
            getAllMenuItems();
        }
    };

    const deleteMenuItem = async () => {
        let data1 = await POST(CONSTANTS.DELETE_MENU_ITEM, { id: data._id });
        close(false);
        if (data1) {
            alert(data1);
            getAllMenuItems();
        }
        setMessage('');
        setPopup(false);
    }

    const footerContent = (
        <div>
            {data.name ? <Button label="Delete" onClick={openPopup}
                tooltip={CONSTANTS.TOOLTIPS.REMOVE} severity="danger"
            /> : <></>}

            <Button label="Discard" icon="pi pi-times" onClick={() => close(false)}
                tooltip={CONSTANTS.TOOLTIPS.DISCARD} severity="warning"
            />

            <Button label="Save" onClick={() => addUpdateMenuItem(false)} autoFocus
                tooltip={CONSTANTS.TOOLTIPS.SAVE}
            />
        </div>
    );


    return (
        <div className="card flex justify-content-center">
            <Dialog header="Enter Menu Item Details" visible={visible} style={{ width: '50vw' }} onHide={() => close(false)} footer={footerContent}>

                <CustomInputField id='name' label='Item Name' value={name} setter={setName} className={'input'}
                    tooltip={CONSTANTS.TOOLTIPS.DISCARD} required
                />

                <CustomInputField id='price' type='number' label='Item Price' value={price} setter={setPrice} className={'input'}
                    tooltip={CONSTANTS.TOOLTIPS.COST} required
                />

                <CustomTextArea id='ingredients' label='Ingredients' rows='5' cols='30' value={ingredients} setter={setIngredients}
                    tooltip={CONSTANTS.TOOLTIPS.INGREDIENTS} required
                />

            </Dialog>
            <CustomPopup header='Confirmation' message={message}
                singleButton={false} callback={deleteMenuItem} visible={popup} toggle={setPopup}
            />
        </div>
    )
}
