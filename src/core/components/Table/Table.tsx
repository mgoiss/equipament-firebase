import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  CardHeaderProps,
  Divider,
  LinearProgress,
  Theme,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { DataGrid, DataGridProps, ptBR } from "@mui/x-data-grid";
import { ReactNode } from "react";

interface TableProps extends DataGridProps {
  title?: CardHeaderProps["title"];
  sx?: SxProps<Theme>;
  error?: ReactNode;
  pageSize?: number;
  textButton: string;
  onClickModal: () => void;
}

const localizedTextsMap = {
  columnMenuUnsort: "não classificado",
  columnMenuSortAsc: "Classificar por ordem crescente",
  columnMenuSortDesc: "Classificar por ordem decrescente",
  columnMenuFilter: "Filtro",
  columnMenuHideColumn: "Ocultar",
  columnMenuShowColumns: "Mostrar colunas",
};

function Table(props: TableProps) {
  const {
    sx,
    error,
    title,
    initialState = {},
    pageSize,
    textButton,
    onClickModal,
    ...rest
  } = props;

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      )}
      <Card
        sx={{
          width: "100%",
          ...sx,
        }}
      >
        {title && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardHeader title={title} />
              <Button
                variant="contained"
                sx={{ height: "90%", mr: 2 }}
                onClick={() => onClickModal()}
              >
                {textButton}
              </Button>
            </Box>
            <Divider />
          </>
        )}
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            ...initialState,
          }}
          sx={title ? { border: "none" } : {}}
          autoHeight
          pageSizeOptions={[5, 10, 20, 50, 100]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          components={{
            LoadingOverlay: LinearProgress,
          }}
          {...rest}
        />
      </Card>
    </>
  );
}

export default Table;
