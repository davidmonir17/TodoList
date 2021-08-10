import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  Table  from '@material-ui/core/Table';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import {gql, useQuery} from '@apollo/client'
import { NetworkStatus } from '@apollo/client';



const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

    const taskquery=gql`
query GetTasks {
    tasks(where: {completed:true}) {
        completed
        duedate
        title
        id
      }
}`;

const CompletedPagination = () => {
    const{ loading, error, data,refetch, networkStatus } = useQuery( taskquery ,{
        notifyOnNetworkStatusChange: true,
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        refetch();
      };

      //m7tag aguib al length bta3 al dta //data.tasks.length()
      const emptyRows = 3 - Math.min(3, 10- page * 3);

        if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
        if(loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
    return (
        <div className="form-pagination">
            <div >
            <h2 className="h">  TodoList of Completed Task Pagination</h2>
        <TableContainer   >
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">DeuDate</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {/* rowperPage=3 */}
                {data.tasks.slice(page * 3, page * 3 + 3).map(({title,duedate,completed,id})=>(
                    
                    <TableRow key={id}>
                        <TableCell component="th" scope="row">
                            {title}
                        </TableCell>
                        <TableCell align="left">{duedate}</TableCell>
                    </TableRow>
                    
                    
                ))}
                {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
            </TableRow>
        )}
            </TableBody>
            </Table>
            <TablePagination 
            component="div"
            count={data.tasks.length} rowsPerPage={3}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPageOptions
            />
            
        </TableContainer>
        </div>
        </div>
    )
}

export default CompletedPagination
