import { DataGrid } from '@mui/x-data-grid';
import { ProductType } from '../../../constants/type';
import columns from './TableColumn';



type Props = {
  products: ProductType[]
  handleDelete:(_id: string)=> void
}
export default function DataTable({products, handleDelete} :Props) {

  // Do DataGrid của mui yêu cầu id để làm unique nên phải chuyển _id thành id
  const productsWithId = products.map(product => ({
    ...product,
    id: product._id, 
  }));
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      // Quan tâm đến cái rows với columns thôi
      // Datagrid bắt phải có kiểu dữ liệu của header là column đấy, và column mình viết ra ngoài nhận 1 func handleDelete để tý nữa xóa
        columns={columns({handleDelete})}
      // Còn đây là các rows , dữ liệu products của mình nhận productsWithId sau khi đã biến đổi _id thành id
        rows={productsWithId}
        
      // Don't care at this moment
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