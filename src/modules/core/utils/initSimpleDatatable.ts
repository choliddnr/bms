import { DataTable } from "simple-datatables";


function adaptPageDropdown(dataTable: DataTable) {
  const selector = dataTable.wrapperDOM.querySelector('.datatable-selector')
  selector?.parentNode?.parentNode?.insertBefore(selector, selector.parentNode)
  selector?.classList.add('form-select')
}

// Add bs5 classes to pagination elements
function adaptPagination(dataTable: DataTable) {
  const paginations = dataTable.wrapperDOM.querySelectorAll('ul.dataTable-pagination-list')

  for (const pagination of paginations) {
    pagination.classList.add(...['pagination', 'pagination-primary'])
  }

  const paginationLis = dataTable.wrapperDOM.querySelectorAll('ul.dataTable-pagination-list li')

  for (const paginationLi of paginationLis) {
    paginationLi.classList.add('page-item')
  }

  const paginationLinks = dataTable.wrapperDOM.querySelectorAll('ul.dataTable-pagination-list li a')

  for (const paginationLink of paginationLinks) {
    paginationLink.classList.add('page-link')
  }
}

const refreshPagination = (dataTable: DataTable) => {
  adaptPagination(dataTable)
}


export default function initDataTable<DataTable>(el:HTMLTableElement|string){
    const datatables = new DataTable(el)
    // Patch "per page dropdown" and pagination after table rendered
    datatables.on('datatable.init', () => {
      adaptPageDropdown(datatables)
      refreshPagination(datatables)
    })
    datatables.on('datatable.update', () => {
      refreshPagination(datatables)
    })
    datatables.on('datatable.sort', () => {
      refreshPagination(datatables)
    })
    
    // Re-patch pagination after the page was changed
    datatables.on('datatable.page', () => {
      adaptPagination(datatables)
    })

    return datatables
}