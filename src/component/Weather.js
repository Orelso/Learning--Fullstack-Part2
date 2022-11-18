import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Weather = ({name, weather: [{ main, description, icon }], wind: {speed, deg, gust}}) => {
  return (
    <div>
    <h1 style={{color: 'white'}}>Weather in {name}</h1>
    <TableContainer align="center">
    <TableBody>
    <Table>
        <TableRow>
      <TableCell sx={{align: 'center'}}><p>{description}</p></TableCell>
      <TableCell><img
        src={
          icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : undefined
        }
        alt={main}
      /></TableCell>
            <TableCell>|</TableCell>
      <TableCell><p>Speed: <i style={{ color: "blue" }}>{speed}</i></p></TableCell>
      <TableCell>|</TableCell>
      <TableCell><p>Deg: <i style={{ color: "blue" }}>{deg}</i></p></TableCell>
      <TableCell>|</TableCell>
      <TableCell><p>Gust: <i style={{ color: "blue" }}>{gust}</i></p></TableCell>
      <TableCell>|</TableCell>
      </TableRow>
      </Table>
      </TableBody>
      </TableContainer>
      </div>
  );
};

export default Weather;
