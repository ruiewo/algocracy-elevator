import { Link, Typography } from '@mui/material';

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="snow" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Algocracy
            </Link>
            {' 2022.'}
        </Typography>
    );
}
