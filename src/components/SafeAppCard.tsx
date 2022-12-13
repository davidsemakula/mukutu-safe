import React, { useContext } from 'react';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

import AppContext from '../context/AppContext';

export default function Home({ app }: { app: SafeAppData }): React.ReactElement {
  const { setApp } = useContext(AppContext);

  return (
    <Card key={`app-${app.id}`} variant="outlined" sx={{ maxWidth: 345 }} onClick={() => setApp(app)}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar alt={app.name} src={app.iconUrl} aria-label={app.name} />}
          title={app.name}
          subheader=""
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {app.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
