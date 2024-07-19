import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import GridDeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ProductType } from "../../../constants/type";

type Props = {
  handleClickOpen: (_id: string) => void;
  handleEdit: (_id: string) => void;
};

const columns = ({
  handleClickOpen,
  handleEdit,
}: Props): GridColDef<ProductType>[] => [
  { field: "title", type: "string", headerName: "Title", width: 150 },
  { field: "price", type: "number", headerName: "Price" },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 320,
  },
  {
    field: "image",
    type: "string",
    headerName: "Image",
    width: 150,
    renderCell: (params) => (
      <div style={{ width: 150, height: 150, overflow: "hidden" }}>
        <img
          src={params.value}
          alt="Product"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    ),
  },
  {
    field: "categoryId",
    type: "string",
    headerName: "Category",
    renderCell: (params) => {
      const ctName = params.value.name ? params.value.name : "none";
      console.log("value", ctName);
      return (
        <div style={{ width: 100, height: 100, overflow: "hidden" }}>
          {ctName}
        </div>
      );
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
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
];

export default columns;
