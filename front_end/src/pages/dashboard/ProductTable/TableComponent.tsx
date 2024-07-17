import { DataGrid } from '@mui/x-data-grid';
import { ProductType } from '../../../constants/type';
import columns from './TableColumn';

type Props = {
  products: ProductType[]
  handleDelete:(_id: string)=> void
  handleEdit:(_id: string)=> void
}

export default function TableComponent({ products, handleDelete, handleEdit } : Props) {
  const productsWithId = products.map(product => ({
    ...product,
    id: product._id, 
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns({ handleDelete, handleEdit })}
        rows={productsWithId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
