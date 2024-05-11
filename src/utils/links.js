import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';


const links = [
    {
        key : 1,
        text: 'Stats',
        icon : <IoBarChartSharp />,
        path : '/'
    },
    {
        key : 2,
        text: 'All Jobs',
        icon : <MdQueryStats />,
        path : 'all-jobs'
    },
    {
        key : 3,
        text: 'Add Job',
        icon : <FaWpforms />,
        path : 'add-job'
    },
    {
        key : 4,
        text: 'Profile',
        icon : <ImProfile />,
        path : 'profile'
    }
];

export default links;