import React from 'react';
import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux';

import CONSTANTS from '../Setup/Constants.json';
import { setMenuItem } from '../Redux/Data';
import { addToOrder } from '../Redux/Order';
import CustomButton from './CustomButton';

export default function MenuItemCard({ name, price, ingredients, className = '', showpop, id, _id, ...rest }) {

    const user = useSelector(_ => _.user);
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setMenuItem({ name, price, ingredients, _id }));
        showpop(true);
    }

    const addItem = () => {
        dispatch(addToOrder({ name, price }));
    }

    const footer = (info) => (
        <div id={'buttondiv' + info.id} className="flex flex-wrap justify-content-end gap-2" >
            {user.role === 'Admin' ?
                <CustomButton id={'buttonedit' + info.id} label="Edit" onClick={handleEdit}
                    tooltip={CONSTANTS.TOOLTIPS.EDIT} tooltipOptions={{ position: 'left' }}
                />
                :
                <></>}

            {user.role === 'Customer' ?
                <CustomButton id={'buttonadd' + info.id} label="Add to order" onClick={addItem}
                    tooltip={CONSTANTS.TOOLTIPS.ADD_TO_ORDER} tooltipOptions={{ position: 'left' }}
                />
                :
                <></>}
        </div >
    );

    return (
        <div id={id} className="col-4">
            <Card id={id} title={name} subTitle={price + ' £'} className={className + ' menuCard '} footer={footer} {...rest}>
                <p id={id} className="m-0">
                    {ingredients}
                </p>
            </Card>
        </div>
    )
}
