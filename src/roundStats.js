import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
   counter += 1;
   return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function stableSort(array, cmp) {
   const stabilizedThis = array.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
   });
   return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
   return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



class StatsHeaderRow extends React.Component {
   state = {
      rows: [
         { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
         { id: 'round 1', numeric: true, disablePadding: false, label: 'Round1' },
         { id: 'round 2', numeric: true, disablePadding: false, label: 'Round2' },
         { id: 'round 3', numeric: true, disablePadding: false, label: 'Round3' },
         { id: 'round 4', numeric: true, disablePadding: false, label: 'Round4' },
         { id: 'round 5', numeric: true, disablePadding: false, label: 'Round5' }
      ]
   }


   createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
   };

   render() {
      const { order, orderBy, rowCount } = this.props;

      return (
         <TableHead >
            <TableRow>
               {this.state.rows.map(
                  row => (
                     <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                     >
                        <Tooltip
                           title="Sort"
                           placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                           enterDelay={300}
                        >
                           <TableSortLabel
                              active={orderBy === row.id}
                              direction={order}
                              onClick={this.createSortHandler(row.id)}
                           >
                              {row.label}
                           </TableSortLabel>
                        </Tooltip>
                     </TableCell>
                  ),
                  this,
               )}
            </TableRow>
         </TableHead>
      );
   }
}

StatsHeaderRow.propTypes = {
   onRequestSort: PropTypes.func.isRequired,
   order: PropTypes.string.isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
   root: {
      margin: '0 auto',
      marginTop: '15px',
      width: '90%',
   },
   table: {
      width: '90%',
      marginLeft: '25px'
   },
   tableWrapper: {
      overflowX: 'auto',

   },
   title: {
      padding: "20px 20px 5px 25px"
   }
});

class StatsTable extends React.Component {
   state = {
      order: 'asc',
      orderBy: 'Round1',
      data: [
         createData('Donut', 452),
         createData('Eclair', 262),
         createData('Frozen yoghurt', 159)
      ],
      page: 0,
      rowsPerPage: 5,
   };

   handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';

      if (this.state.orderBy === property && this.state.order === 'desc') {
         order = 'asc';
      }

      this.setState({ order, orderBy });
   };

   handleChangePage = (event, page) => {
      this.setState({ page });
   };

   handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value });
   };

   render() {
      const { classes } = this.props;
      const { data, order, orderBy, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

      return (
         <Paper className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle">
               Round Statistics
          </Typography>


            <div className={classes.tableWrapper}>
               <Table className={classes.table} aria-labelledby="tableTitle">
                  <StatsHeaderRow
                     order={order}
                     orderBy={orderBy}
                     onRequestSort={this.handleRequestSort}
                     rowCount={data.length}
                  />
                  <TableBody>
                     {stableSort(data, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(n => {
                           return (
                              <TableRow
                                 hover
                                 onClick={event => this.handleClick(event, n.id)}
                                 tabIndex={-1}
                                 key={n.id}
                              >
                                 <TableCell component="th" scope="row" padding="none">
                                    {n.name}
                                 </TableCell>
                                 <TableCell align="right">{n.calories}</TableCell>
                                 <TableCell align="right">{n.calories}</TableCell>
                              </TableRow>
                           );
                        })}
                     {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                           <TableCell colSpan={6} />
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </div>
            <TablePagination
               rowsPerPageOptions={[5, 10, 25]}
               component="div"
               count={data.length}
               rowsPerPage={rowsPerPage}
               page={page}
               backIconButtonProps={{
                  'aria-label': 'Previous Page',
               }}
               nextIconButtonProps={{
                  'aria-label': 'Next Page',
               }}
               onChangePage={this.handleChangePage}
               onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
         </Paper>
      );
   }
}

StatsTable.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsTable);
