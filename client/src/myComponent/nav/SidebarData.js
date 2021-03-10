import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData =[
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon : <AiIcons.AiFillHome />,
        cName: 'nav-text active'

    },
    {
        title: 'Product',
        path : '/admin/product',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'

    },

    {
        title: 'Products',
        path : '/admin/product',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'

    },

    {
        title: 'Category',
        path : '/admin/category',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'

    },

    {
        title: 'Sub Category',
        path : '/admin/sub',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'

    },
    
    {
        title: 'Cupon',
        path : '/admin/cupon',
        icon: <FaIcons.FaPercent/>,
        cName: 'nav-text'

    },

    {
        title: 'Cupon',
        path : '/admin/cupon',
        icon: <AiIcons.AiFillEye/>,
        cName: 'nav-text'

    },
         
         
         


         
];