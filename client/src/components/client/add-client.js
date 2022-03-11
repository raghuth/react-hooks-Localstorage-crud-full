import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent, 
  TextField,
  Typography,
  Button, 
} from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useParams,useNavigate } from "react-router-dom";
import { ClientBean } from "./client.bean";
import { ClientService } from "../service/client.service";
import "./client-list.css";

export const AddClientComponent = (props)=> {
  let { id } = useParams();  
  console.log("Add ", id);
  let navigate = useNavigate();
  let clientService = new ClientService();
  let [clientBean, setClient] = useState(new ClientBean()); 
  
  useEffect(() => {
    if (id) {
      clientService.get(id).then((data) => {   
        setClient(data);       
      });
    }   
  }, []);

  const handleSubmit = (fields) => {     
     clientBean.name = fields.name;
     if (id) {
       clientService.update(clientBean).then((data) => {
        setClient(data);  
         navigate("/home");        
       });
     } else {
       clientService.create(clientBean).then((data) => {
        setClient(data) 
        navigate("/home");   
       }).catch(function (error) {
        console.log([error.response.data.message])       
    });
     }    
  };
  
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader
              avatar={<AccountBalanceIcon className="card-header-icon" />}
              title={id ? "Edit Customer" : "Add Customer"}
              subheader="Create and manage platform Customer."
              className="card-grid"
            />
            <CardContent>
            <Formik
			          enableReinitialize
                initialValues={{name: clientBean.name }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Required"),
                })}
                onSubmit={(fields, { setSubmitting }) => {
                  console.log("submit", fields);
                  Object.assign(clientBean, fields);				      
                  handleSubmit(fields);
                  setSubmitting(false);
                }}
              >
                <Form className="helpGrid">
                  <Grid justifyContent="space-between" container>
                    <Grid justifyContent="space-between" container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">NAME</Typography>
                        <Field
                          name="name"
                          as={TextField}
                          fullWidth
                          style={{ marginBottom: 40 }}                         
                          variant="outlined"
						   inputProps={{                         
                            autoComplete: "off",
                            autoFocus: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid justifyContent="flex-end" container>
                    <Button type="submit" color="primary" variant="contained">
                      SAVE
                    </Button>
                  </Grid>                
                </Form>                
              </Formik>    
            </CardContent>         
          </Card>
        </Grid>
      </Grid>
    </>
  );
}


