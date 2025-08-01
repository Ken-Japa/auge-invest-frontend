import { useState } from 'react';

type Order = 'asc' | 'desc';

export function useTableSort<T, K extends keyof T>(initialOrderBy: K, initialOrder: Order = 'desc') {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [orderBy, setOrderBy] = useState<K>(initialOrderBy);

  const handleRequestSort = (property: K) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = (data: T[], comparator: (a: T, b: T) => number) => {
    const stabilizedThis = data.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const orderResult = comparator(a[0], b[0]);
      if (orderResult !== 0) {
        return order === 'asc' ? orderResult : -orderResult;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  return {
    order,
    orderBy,
    handleRequestSort,
    sortedData,
  };
}

interface ComparatorOptions<T> {
  orderBy: keyof T;
  order: Order;
}

export function getComparator<T>(options: ComparatorOptions<T>): (a: T, b: T) => number {
  const { orderBy, order } = options;
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}