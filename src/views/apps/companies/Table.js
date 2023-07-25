/*eslint semi: ["error", "always"]*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';

import { ChevronDown, Printer, FileText, File, Grid, Copy } from 'react-feather';

import { getData, setSidebar } from './store';

import { selectThemeColors } from '@utils';

import { columns } from './columns';
import Sidebar from './Sidebar';

import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(store.data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Mostrar</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              style={{ width: '5rem' }}
              onChange={ handlePerPage }
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Registros</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Buscar:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              {/* <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle> */}
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Agregar Compañia
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// ** Store Vars
const CompaniesList = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.companies);

// ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('_id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentStatus, setCurrentStatus] = useState({ label: 'Seleccione Estatus', number: 0, value: '' });

  // ** Function to toggle sidebar
  const toggleSidebar = () => {
    dispatch(setSidebar(!store.sidebar));
  };

   // ** Get data 
  useEffect(() => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value
      })
    );
  }, [dispatch, store?.length, sort, sortColumn, currentPage]);

//** Function in get data on page change
const handlePagination = page => {

   dispatch(
        getData({
          sort,
          sortColumn,
          q: searchTerm,
          page: currentPage,
          perPage: rowsPerPage,
          status: currentStatus.value
    })
  );
    setCurrentPage(page.selected + 1);
  };

//**status Options
  const statusOptions = [
    { label: 'Select Estatus', number: 0, value: '' },
    { label: 'Inactivo', number: 0, value: 0 },
    { label: 'Activo', number: 1, value: 1 }
  ];

  
  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
       // role: currentRole.value,
        status: currentStatus.value
      })
    );
    setRowsPerPage(value);
  };


  // ** Function to handle Search bar
  const handleFilter = val => {
    setSearchTerm(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value
      })
    );
  };

   // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store?.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      status: currentStatus.value,
      q: searchTerm
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store?.data?.length > 0) {
      return store.data;
    } else if (store?.data?.length === 0 && isFiltered) {
      return [];
    }
  };

  // function sort on store
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value
      })
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: `status=${data.number}`,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage
                    })
                  );
                }}
              />  
            </Col>
            <Col md='2'>
              <Label for='status-select'>Actualizar</Label>
              <Button
              outline
              color='info'
              onClick={() => { 
                setRowsPerPage(10);
                setCurrentPage(1); 
                setSearchTerm('');
                setCurrentStatus({ label: 'Seleccione Estatus', number: 0, value: '' });
                setSort('desc');       
                dispatch(
                  getData({
                    sort,
                    sortColumn,
                    q: searchTerm,
                    page: currentPage,
                    perPage: rowsPerPage,
                    status: currentStatus.value
                  })
                );
              }} >   
                <span className='align-middle ms-25'>Actualizar</span>
              </Button>                      
            </Col> 
          </Row>
        </CardBody>
      </Card>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
        <CardHeader>
          <CardTitle tag='h4'>Tabla lista Compañias</CardTitle>
        </CardHeader>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(toggleSidebar)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>
      <Sidebar />
    </>
  );
};

export default CompaniesList;