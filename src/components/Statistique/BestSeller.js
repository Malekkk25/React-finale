import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, CardContent, Typography, Box } from "@mui/material";
const BestSeller = () => {
  const [total, setTotal] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/bestSeller")
      .then((response) => {
        setTotal(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total : ", error);
      });
  }, []);


  return (
    <div style={{ margin: "0 auto", width: "100%", marginLeft: "0%"  }}>
    <Card style={{ width: "70%", height: "50%" }}>
      <Box p={3} display="flex" alignItems="center">
        <Typography variant="h4" align='cenetr'><b>Seller of the year</b></Typography>
      </Box>
      <CardContent> 
      <Typography variant="h4" ><center>{total}</center></Typography>
      </CardContent>
    </Card>
  </div>
  )
}

export default BestSeller
