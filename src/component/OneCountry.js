import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const OneCountry = ({
  name: { common, official },
  nativeName,
  /*nativeName: {official, common}*/ capital,
  area,
  languages,
  flags,
  coatOfArms,
  maps,
}) => {


  return (
    <div>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{mt: 2}}
      >
        <Card sx={{ width: 400, display: "flex", borderRadius: 10 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              <h2>
                Common Name: <i style={{ color: "blue" }}>{common}</i>
              </h2>
            </Typography>
            <Typography variant='h5' component='div'>
              <h3>
                Official Name: <i style={{ color: "blue" }}>{official}</i>
              </h3>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              <p>
                <b>Capital:</b>
                <i style={{ color: "blue" }}> {capital}</i>
              </p>
            </Typography>
            <Typography variant='body2'>
              <h4>Languages:</h4>
              <p>
                {Object.values(languages).map((lang) => (
                  <li style={{ color: "blue" }} key={lang}>{lang}</li>
                ))}
              </p>
            </Typography>
            <Typography>
              <h1>
                <img src={flags?.png} alt='img' />
              </h1>
            </Typography>
            <Typography>
              <h4>Coat of Arms</h4>
              <h1>
                <img src={coatOfArms?.png} alt='*Seems like no img' width={100} />
              </h1>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* <h3>Official Name: <i>{nativeName.common}</i></h3> */}
      {/* <h1><href src={maps?.googleMaps} alt="url"  /></h1> */}
    </div>
  );
};

export default OneCountry;
