import React, { useContext, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AppContext from '../context/AppContext';
import { ChainSafeAppData } from '../utils/types';
import { getDisplayName, SimpleChainInfo } from '../utils/chains';

type Props = { app: ChainSafeAppData };

export default function SafeAppCard({ app }: Props): React.ReactElement {
  const { setApp } = useContext(AppContext);
  const tags = useMemo(
    () =>
      (app.tags ?? []).filter(
        (tag) =>
          // Filter out internal Safe app tags
          !['nft', 'transaction-builder', 'dashboard-widgets', 'safe-claiming-app', 'wallet-connect'].includes(tag),
      ),
    [app.tags],
  );
  const supportedRelatedChains: Array<SimpleChainInfo> = useMemo(() => {
    if (app.onlySupportsRelatedChains && Array.isArray(app.supportedRelatedChains)) {
      return app.supportedRelatedChains;
    }
    return [];
  }, [app.supportedRelatedChains]);

  const onSelectApp = () => {
    setApp(app);
  };

  return (
    <Card key={`app-${app.id}`} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea
        color="primary"
        sx={{ flexGrow: 1, '&:hover': { backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08) } }}
        disabled={app.onlySupportsRelatedChains}
        onClick={onSelectApp}
      >
        <CardHeader avatar={<Avatar alt={app.name} src={app.iconUrl} aria-label={app.name} />} />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="h6" color="text.secondary" mb={1}>
            {app.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {app.description}
          </Typography>
          {tags.length ? (
            <Box>
              {tags.map((tag, idx) => (
                <Chip key={`tag-${idx}-${tag}`} label={tag} sx={{ mr: 0.5, mb: 1 }} />
              ))}
            </Box>
          ) : null}
          {supportedRelatedChains.length ? (
            <Box mt={1}>
              <Box>
                <Typography variant="caption" mb={0.5} textOverflow="ellipsis">
                  Available on:
                </Typography>
              </Box>
              <Box>
                {supportedRelatedChains.map((chain, idx) => (
                  <Chip
                    key={`chain-${idx}-${chain.name}`}
                    color="primary"
                    variant="filled"
                    size="small"
                    label={chain.label ?? getDisplayName(chain.name)}
                    sx={{ mr: 0.5, mb: 1 }}
                  />
                ))}
              </Box>
            </Box>
          ) : null}
        </CardContent>
      </CardActionArea>
      {app.onlySupportsRelatedChains ? (
        <CardActions sx={{ m: 1 }}>
          <Button size="small" color="primary" variant="outlined" endIcon={<ArrowForwardIcon />} onClick={onSelectApp}>
            I'm feeling lucky
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
