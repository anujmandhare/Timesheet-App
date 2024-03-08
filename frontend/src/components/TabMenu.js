import { useSelector } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';

import Profile from '../Pages/Profile';
import Orders from '../Pages/Orders';
import OrderPreview from '../Pages/OrderPreview';
import Menu from '../Pages/Menu';
import PreviousOrders from '../Pages/PreviousOrders';

export default function CustomTabMenu({ tab, setTab }) {

    const role = useSelector(_ => _.user.role);

    return (
        <div id='TabView' className="card">
            <TabView activeIndex={tab} onTabChange={(e) => setTab(e.index)}>
                <TabPanel header="Profile" leftIcon='pi pi-user-edit mr-2'>
                    <Profile />
                </TabPanel>
                <TabPanel header="Menu" leftIcon='pi pi-list mr-2'>
                    <Menu />
                </TabPanel>
                {role === 'Customer' ?
                    <TabPanel header="Order Preview" leftIcon='pi pi-cart-plus mr-2'>
                        <OrderPreview />
                    </TabPanel>
                    :
                    <></>}
                <TabPanel header="Current Orders" leftIcon='pi pi-shopping-cart mr-2'>
                    <Orders />
                </TabPanel>
                <TabPanel header="Previous Orders" leftIcon='pi pi-shopping-bag mr-2'>
                    <PreviousOrders />
                </TabPanel>
            </TabView>
        </div>
    )
}
