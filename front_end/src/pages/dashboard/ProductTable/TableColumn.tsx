import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import GridDeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Đảm bảo rằng bạn đang sử dụng đúng biểu tượng edit
import { ProductType } from '../../../constants/type';
import { Button } from '@mui/material';

type Props = {
    handleClickOpen: (_id: string) => void;
    handleEdit: (_id: string) => void;
}

const columns = ({ handleClickOpen, handleEdit }: Props): GridColDef<ProductType>[] => [
    { field: 'title', type: 'string', headerName: 'Title' },
    { field: 'price', type: 'number', headerName: 'Price' },
    { field: 'description', type: 'string', headerName: 'Description', width: 320 },
    { field: 'image', type: 'string', headerName: 'Image', width: 150, renderCell: (params) => (
        <img src={params.value} alt="Product" style={{ width: '100%', height: 'auto' }} />
    )},
    { field: 'categoryId', type: 'string', headerName: 'Category' },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 120,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => handleEdit(params.id as string)}
            />,
            <GridActionsCellItem
                icon={<GridDeleteIcon />}
                label="Delete"
                onClick={() => handleClickOpen(params.id as string)}
            />,
        ],
    },
]

export default columns;
