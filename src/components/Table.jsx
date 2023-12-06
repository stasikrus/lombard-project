import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { TextField } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers';


function createData(id, dateString, name, type, profit, comment) {
  const date = new Date(dateString);
  return {
    id,
    date,
    name,
    type,
    profit,
    comment,
  };
}

// new feature
// add new feature

const rows = [
  createData(1, '2023-01-01', 'Cupcake', 'Обмен', 3.7, 67, 4.3),
  createData(2, '2023-01-01', 'Donut', 'Обмен', 25.0, 51, 4.9),
  createData(3, '2023-01-01', 'Eclair', 'Обмен', 16.0, 24, 6.0),
  createData(4, '2023-01-01','Frozen yoghurt', 'Обмен', 6.0, 24, 4.0),
  createData(5, '2023-01-01','Gingerbread', 'Обмен', 16.0, 49, 3.9),
  createData(6, '2023-01-01','Honeycomb', 'Обмен', 15.0, 87, 6.5),
  createData(7, '2023-01-01','Ice cream sandwich', 'Обмен', 9.0, 37, 4.3),
  createData(8, '2023-01-01','Jelly Bean', 'Обмен', 0.0, 94, 0.0),
  createData(9, '2023-01-01','KitKat', 'Обмен', 26.0, 65, 7.0),
  createData(10, '2023-01-01','Lollipop', 'Обмен', 0.2, 98, 0.0),
  createData(11, '2023-01-01','Marshmallow', 'Обмен', 0, 81, 2.0),
  createData(12, '2023-01-01','Nougat', 'Обмен', 19.0, 9, 37.0),
  createData(13, '2023-01-01','Oreo', 'Обмен', 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Дата',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Сделка',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Тип',
  },
  {
    id: 'profit',
    numeric: true,
    disablePadding: false,
    label: 'Доход',
  },
  {
    id: 'comment',
    numeric: true,
    disablePadding: false,
    label: 'Комментарий',
  },  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onEditClick } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Учет операций
        </Typography>
      )}

      {numSelected > 0 && numSelected < 2 ? (
        <Tooltip title="Edit">
          <IconButton onClick={onEditClick}>
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

function TableComponent() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('type');
  const [selected, setSelected] = React.useState([]);
  const [tableData, setTableData] = React.useState(rows);
  const [editingRowId, setEditingRowId] = React.useState(null);
  const [tempValues, setTempValues] = React.useState({});

  const handleEditClick = () => {
    if (selected.length === 1) {
      setEditingRowId(selected[0]);
    }
  };
  
  const handleInputChange = (field, event) => {
  setTempValues({
    ...tempValues,
    [field]: event.target.value,
    });
  };

  const handleSave = (rowId) => {
    const updatedData = tableData.map(row =>
      row.id === rowId ? { ...row, ...tempValues } : row
    );
    setTableData(updatedData);
    setEditingRowId(null);
    setSelected([]); 
    setTempValues({});
    console.log(updatedData);
  };

  const handleCancel = () => {
    setTempValues({});
    setEditingRowId(null);
  };  
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickOnTextField = (event) => {
    event.stopPropagation();
  };

  const handleClick = (event, id) => {
    if (event.target.getAttribute("data-datepicker-clicked") === "true") {
      event.target.removeAttribute("data-datepicker-clicked");
      return;
    }

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onEditClick={handleEditClick} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                    onClick={(event) => handleClick(event, row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}                     
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {editingRowId === row.id ? (
                      <>
                        <TableCell align="right" onClick={handleClickOnTextField}>
                          <DatePicker
                            value={tempValues.date ?? row.date}
                            onChange={(newValue) => {
                              setTempValues({ ...tempValues, date: newValue });
                            }}
                            renderInput={(params) => (
                              <TextField 
                                {...params} 
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <TextField
                            defaultValue={row.name}
                            onClick={handleClickOnTextField}
                            onChange={(event) => handleInputChange('name', event)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Select
                            value={tempValues.type ?? row.type}
                            sx={{ minWidth: '150px' }}
                            onChange={(event) => handleInputChange('type', event)}
                            onClick={handleClickOnTextField}
                          >
                            <MenuItem value="Продажа">Продажа</MenuItem>
                            <MenuItem value="Обмен">Обмен</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            defaultValue={row.profit}
                            onClick={handleClickOnTextField}
                            onChange={(event) => handleInputChange('profit', event)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            defaultValue={row.comment}
                            onClick={handleClickOnTextField}
                            onChange={(event) => handleInputChange('comment', event)}
                          />
                        </TableCell>
                        <TableCell align='right'>
                          <Tooltip title="Сохранить">
                            <IconButton onClick={() => handleSave(row.id)}>
                              <CheckOutlinedIcon fontSize='large' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Отменить">
                            <IconButton onClick={handleCancel}>
                              <ClearOutlinedIcon fontSize='large'/>
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="left">{row.date.toLocaleDateString()}</TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.profit}</TableCell>
                        <TableCell align="right">{row.comment}</TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}   
                <TableRow
                >
                  <TableCell colSpan={6} />
                </TableRow>             
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default TableComponent;