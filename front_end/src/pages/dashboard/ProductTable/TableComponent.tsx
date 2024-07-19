import { DataGrid } from '@mui/x-data-grid';
import { ProductType } from '../../../constants/type';
import columns from './TableColumn';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React, { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';

type Props = {
  products: ProductType[]
  handleDelete: (_id: string) => void
  handleEdit: (_id: string) => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableComponent({ products, handleDelete, handleEdit }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const productsWithId = products.map(product => ({
    ...product,
    id: product._id,
  }));

  const handleClickOpen = (_id: string) => {
    setOpen(!open);
    setId(_id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns({ handleClickOpen, handleEdit })}
        rows={productsWithId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />

      <React.Fragment>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Bạn có muốn xóa sản phẩm này không?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {/* Bạn có muốn muốn xóa thôi */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button color="error" onClick={() => { handleClose(); handleDelete(id); }}>Delete</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
