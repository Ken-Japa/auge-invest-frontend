import { useMemo,useState } from 'react';

import { FIIExtended } from '../types';

type Order = 'asc' | 'desc';
type OrderBy = 'quotaCount' | 'quotaDateApproved';

export const useFIITableLogic = (fiis: FIIExtended[]) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('quotaCount');

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedFiis = useMemo(() => {
    return [...fiis].sort((a, b) => {
      if (orderBy === 'quotaCount') {
        const aValue = a.quotaCount ? Number(a.quotaCount) : 0;
        const bValue = b.quotaCount ? Number(b.quotaCount) : 0;
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (orderBy === 'quotaDateApproved') {
        let aDate = 0;
        let bDate = 0;

        if (a.quotaDateApproved) {
          try {
            aDate = new Date(a.quotaDateApproved).getTime();
          } catch (e) {
            aDate = 0;
          }
        }

        if (b.quotaDateApproved) {
          try {
            bDate = new Date(b.quotaDateApproved).getTime();
          } catch (e) {
            bDate = 0;
          }
        }
        return order === 'asc' ? aDate - bDate : bDate - aDate;
      }
      return 0;
    });
  }, [fiis, order, orderBy]);

  return { sortedFiis, order, orderBy, handleRequestSort };
};