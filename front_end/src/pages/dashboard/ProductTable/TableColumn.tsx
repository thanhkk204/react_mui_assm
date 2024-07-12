import { GridActionsCellItem, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { ProductType } from '../../../constants/type';


type Props = {
    handleDelete:(_id: string)=> void
}

const columns = ({ handleDelete }: Props): GridColDef<ProductType>[] => [
      { field: 'title', type: 'string' },
      { field: 'price', type: 'number' },
      { field: 'description', type: 'string', width: 320 },
      { field: 'rating'},
      { field: 'createdAt', type: 'string', width: 320 },
     
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={()=>handleDelete(params.id as string)}
          />,
        ],
      },
    ]


export default columns