import React, { useState, useEffect,useContext } from "react";
import { Grid, Card, CardHeader, CardContent,CardActions, Button } from "@material-ui/core";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate } from "react-router-dom";
import { ClientService } from "../service/client.service";
import { LoginContext } from "../context-api/LoginContext";
import "./client-list.css";

export const ClientListComponent =()=> {
  const { loginUserData } = useContext(LoginContext);
  console.log("loginUserData :",loginUserData)
  let navigate = useNavigate();
  let { _id } = useParams();  
  let clientService = new ClientService();
  let [clients, setClient] = useState([]);

  useEffect(() => {
    clientService.getAllClients().then((data) => {
      setClient(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const addClient = () => {
    navigate("/client/add");
  };
  
  const editClient = (data) => {
    navigate(`/client/edit/${data._id}`);
  };

  const deleteClient = (data) => {
    clientService.delete(data._id).then((data) => {      
      clientService.getAllClients().then((data) => {
        setClient(data);     
      });
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader
              avatar={<AccountBalanceIcon className="card-header-icon" />}
              title={`Client`}
              subheader={loginUserData}
              className="card-grid"
            />            
            <CardContent>
              <Grid container justifyContent="flex-end" alignItems="center" className="m-b-24">
                <Button variant="contained" color="primary" onClick={addClient}>
                  Add Client
                </Button>
              </Grid>
              {clients?.map((data, i) => (
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
		  className="p-t-10"
                  key={i}
                >
                 {data.name}
                  <div>
                    <EditIcon
                      className="point m-r-20"
                      onClick={() => {
                        editClient(data);
                      }}
                    />
                    <DeleteIcon
                      className="point delete-icon"
                      onClick={() => {
                        deleteClient(data);
                      }}
                    />
                  </div>
                </Grid>
              ))}
            </CardContent>
           
          </Card>
        </Grid>
      </Grid>
    </>
  );
}


