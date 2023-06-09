import React,{useState,useEffect, useMemo} from "react";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid, Pagination, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {  TablePagination } from '@material-ui/core';
import CustomPag from "../pagination/CustomPag";
import axios from "axios";
import { request } from  'graphql-request';
import {
  
  Button,
 Fab,
  ButtonGroup,
} from "@mui/material";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import ReactPaginate from 'react-paginate';
import PagUser from "../pagination/PagUser";
import {  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/


const UsersPerformance = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] =useState(false);
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(3);
  const [openDialog, setOpenDialog] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchPosts =async() =>{
      const res=await axios.get('http://localhost:3001/api/getUser');
      setUser(res.data);
      console.log(res.data);
      setLoading(false);}
      fetchPosts();
  }, []);
  
  const indexOfLastPost =currentPage *postsPerPage;
  const indexOfFirstPost =indexOfLastPost -postsPerPage;
  const currentPosts =user.slice(indexOfFirstPost,indexOfLastPost);  
  const deleteUser = (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      Axios.delete(`http://localhost:3001/api/deleteUser/${id}`);
      console.log(id);
      window.location.reload(); // Reload the page if the user clicked "Yes"
    }
    
  }
  // const handleDelete = (id) => {
  //   deleteUser(id);
  //   window.location.reload();
  // };
  
  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/AddUser');
  };
function handlePageClick(e){
  console.log(e);
}
const paginate = ({ selected }) => {
  setCurrentPage(selected + 1);
};
const previousPage = () => {
  if (currentPage !== 1) {
     setCurrentPage(currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage !== Math.ceil(user.length / postsPerPage)) {
     setCurrentPage(currentPage + 1);
  }
};

const handleDelete = () => {
  Axios.delete(`http://localhost:3001/api/deleteUser/${userId}`)
    .then(response => {
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      setOpenDialog(false);
    });
};

const openConfirmationDialog = (id) => {
  setUserId(id);
  setOpenDialog(true);
};


const closeConfirmationDialog = () => {
  setOpenDialog(false);
};
  return (
    <BaseCard title="Users Perfomance" >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add User</Button>
      </div>
      <div>
      <Table
        aria-label="simple table"
        sx={{
          mt: -7,
          whiteSpace: "nowrap",
         
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell >
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                      
                    >
                Id
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Name
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Phone
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Email
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
              Join Time
              </Typography>
            </TableCell>
            <TableCell >
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Update
              </Typography>
            </TableCell>
            <TableCell align="right">
            <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {currentPosts.map(user => (
            <TableRow key={user.login}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  color="textSecondary"
                >
                  {user.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    <Avatar alt={user.login} src="src/assets/users/user.jpg"/>
                      {user.login}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user.tel}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  
                  label={user.email}
                ></Chip>
              </TableCell>
              <TableCell>
              <Typography variant="h6" color="textSecondary">
              {new Date(user.join_time).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}</Typography>
              </TableCell>
              <TableCell  >
              <Link to={`updateUser/${user.id}`}><ModeEditIcon/></Link>
              </TableCell>
              <TableCell align="right" >
              {/* <button onClick={() => {deleteUser(user.id)}}  style={{ border: 'none', background: 'none' }} ><DeleteOutlineIcon/></button> */}
              <>
      {/* Your component code */}
      <button onClick={() => openConfirmationDialog(user.id)} style={{ border: 'none', background: 'none' }}>
        <DeleteOutlineIcon />
      </button>

      <Dialog open={openDialog} onClose={closeConfirmationDialog} maxWidth="xs" fullWidth>
  <DialogTitle>Confirm Deletion</DialogTitle>
  <DialogContent>
    <Typography variant="body1">Are you sure you want to delete this User?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDelete} variant="contained" color="secondary">
      Yes
    </Button>
    <Button onClick={closeConfirmationDialog} variant="contained">
      No
    </Button>
  </DialogActions>
</Dialog>
    </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
     
      {/* <PagUser postsPerPage={postsPerPage} totalPosts={user.length} paginate={paginate} previousPage={previousPage}
                  nextPage={nextPage}/> */}
                  <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(user.length / postsPerPage)}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
               />
</div>
    </BaseCard>
  );

};

export default UsersPerformance;