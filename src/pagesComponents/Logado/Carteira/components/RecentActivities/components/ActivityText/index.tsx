import { Typography, Divider } from '@mui/material';
import dayjs from 'dayjs';

interface ActivityTextProps {
  activity: {
    type: string;
    quantity: number;
    assetCode: string;
    price: number;
    executedAt: string;
  };
}

export const ActivityText = ({ activity }: ActivityTextProps) => {
  const isBuy = activity.type === 'buy';
  const actionText = isBuy ? 'Compra' : 'Venda';
  const actionColor = isBuy ? 'success.main' : 'error.main';
  const price = activity.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return (
    <Typography component="span">
      <Typography component="span" color={actionColor}>
        {actionText}
      </Typography>
      <Typography component="span" color="text.primary">
        {` de ${activity.quantity} `}
        <Typography component="span" fontWeight="bold">
          {activity.assetCode}
        </Typography>
        {` por ${price}. `}
      </Typography>

    </Typography>
  );
};

export const ActivityText2 = ({ activity }: ActivityTextProps) => {
  const isBuy = activity.type === 'buy';
  const valueSign = isBuy ? '-' : '+';
  const valueColor = isBuy ? 'error.main' : 'success.main';
  const formattedValue = (activity.quantity * activity.price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  const date = dayjs(activity.executedAt).locale('pt-br').format('DD [de] MMMM [de] YYYY')

  return (
    <>
      <Typography component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="span" >
          {`${date}`}
        </Typography>
        <Typography component="span" color={valueColor} fontWeight="bold" sx={{ paddingRight: 4 }}>
          {`${valueSign} ${formattedValue}`}
        </Typography>

      </Typography>
      <Divider orientation="horizontal" />
    </>
  );
};
