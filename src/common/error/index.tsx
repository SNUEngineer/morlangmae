import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import svg from './404.svg';
import './index.css';

export default function Error() {
  // useEffect(() => {

  // });

  return (
    <Grid container>
      <Grid item xs={6}>
        <img alt="error-page" src={svg} />
      </Grid>
      <Grid item xs={6}>
        <h1>404</h1>
        <h2>UH OH! You're lost.</h2>
        <p>The page you are looking for does not exist.
        How you got here is a mystery. But you can click the button below
        to go back to the homepage.
          </p>
        <Link className="btn green" to="/">HOME</Link>
      </Grid>
    </Grid>
  );
}
