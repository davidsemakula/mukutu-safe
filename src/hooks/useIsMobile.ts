import { Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useIsMobile() {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
}
